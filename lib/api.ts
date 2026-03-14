import { useAuthStore } from '@/lib/store/auth-store'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const api = axios.create({
    baseURL: '/api',
})

// Request interceptor to add the access token
api.interceptors.request.use(
    (config) => {
        // We get the token directly from the store's current state since this is outside a hook
        const { accessToken } = useAuthStore.getState()
        // Fallback to cookie if Zustand state is stale (e.g. after hydration mismatch)
        const token = accessToken || cookies.get('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Track ongoing refresh to prevent race conditions
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token!)
        }
    })
    failedQueue = []
}

// Response interceptor to handle token refresh on 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Identify auth-related endpoints to prevent refresh loops
        const isAuthEndpoint = 
            originalRequest.url?.includes('/auth/login') ||
            originalRequest.url?.includes('/auth/refresh') ||
            originalRequest.url?.includes('/auth/register') ||
            originalRequest.url?.includes('/applicants/login') ||
            originalRequest.url?.includes('/applicants/register') ||
            originalRequest.url?.includes('/applicants/refresh')

        // If we get a 401 or 403 and haven't tried refreshing yet
        const status = error.response?.status
        if ((status === 401 || status === 403) && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true

            // If a refresh is already in progress, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                            resolve(api(originalRequest))
                        },
                        reject,
                    })
                })
            }

            isRefreshing = true

            try {
                // Read refresh token from both Zustand state AND cookies as fallback
                const { refreshToken: storeRefreshToken, clearTokens, setTokens } = useAuthStore.getState()
                const cookieRefreshToken = cookies.get('refresh_token')
                const refreshToken = storeRefreshToken || cookieRefreshToken

                if (!refreshToken) {
                    // No refresh token anywhere — clear everything and reject
                    clearTokens()
                    processQueue(error, null)
                    return Promise.reject(error)
                }

                // Attempt to refresh — use raw axios, not the `api` instance, to avoid interceptor loops
                // Passing refresh_token as a query parameter as specified by backend error (loc: ["query", "refresh_token"])
                const response = await axios.post(`/api/applicants/refresh?refresh_token=${refreshToken}`)

                // Support both { data: { access_token... } } and { access_token... }
                const responseData = response.data?.data || response.data
                const newAccessToken = responseData?.access_token || responseData?.data?.access_token
                const newRefreshToken = responseData?.refresh_token || responseData?.data?.refresh_token

                if (!newAccessToken || !newRefreshToken) {
                    throw new Error('Invalid refresh response structure')
                }

                // Update tokens in store and cookies
                setTokens(newAccessToken, newRefreshToken)
                processQueue(null, newAccessToken)

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError: unknown) {
                const refreshStatus = (refreshError as { response?: { status: number } })?.response?.status
                
                // Only clear tokens if the refresh itself failed with 401/403 (invalid refresh token)
                // If it's a 500 or network error, we just fail the request but keep the user logged in
                if (refreshStatus === 401 || refreshStatus === 403) {
                    console.error('Token refresh failed (Unauthorized):', (refreshError as { response?: { data: unknown } }).response?.data || (refreshError as Error).message)
                    useAuthStore.getState().clearTokens()
                } else {
                    console.error('Token refresh failed (Server Error):', (refreshError as Error).message)
                }
                
                processQueue(refreshError)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api

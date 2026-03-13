import { useAuthStore } from '@/lib/store/auth-store'
import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

// Request interceptor to add the access token
api.interceptors.request.use(
    (config) => {
        // We get the token directly from the store's current state since this is outside a hook
        const { accessToken } = useAuthStore.getState()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
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

        // If we get a 401 and haven't tried refreshing yet
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
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
                const { refreshToken, setTokens } = useAuthStore.getState()

                if (!refreshToken) {
                    // No refresh token available — clear everything and reject
                    useAuthStore.getState().clearTokens()
                    processQueue(error, null)
                    return Promise.reject(error)
                }

                // Attempt to refresh — tokens are still in cookies at this point
                const response = await axios.post('/api/applicants/refresh', {
                    refresh_token: refreshToken,
                })

                // Correctly unwrap from { data: { access_token, refresh_token } }
                const responseData = response.data?.data || response.data
                const newAccessToken = responseData?.access_token
                const newRefreshToken = responseData?.refresh_token

                if (!newAccessToken || !newRefreshToken) {
                    throw new Error('Invalid refresh response structure')
                }

                // Only NOW update the tokens (after successful refresh)
                setTokens(newAccessToken, newRefreshToken)
                processQueue(null, newAccessToken)

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError: any) {
                // Refresh failed — NOW we clear tokens
                console.error('Token refresh failed:', refreshError.response?.data || refreshError.message)
                useAuthStore.getState().clearTokens()
                processQueue(refreshError, null)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api

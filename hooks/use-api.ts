import { useAuthStore } from '@/lib/store/auth-store'
import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

/**
 * Custom hook providing a configured Axios instance with automated token handling.
 * 
 * Features:
 * - Automatically attaches Bearer tokens to outgoing requests.
 * - Handles 401 Unauthorized errors by attempting a silent token refresh.
 * - Prevents infinite loops by excluding auth endpoints from refresh logic.
 * - Cleans up session state on refresh failure.
 *
 * @returns An object containing typed request methods (get, post, put, patch, delete).
 */

// Request interceptor to attach the current access token
api.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

// Response interceptor to handle 401 errors and attempt token refresh

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

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Identify auth-related endpoints to prevent refresh loops
        const isAuthEndpoint = 
            originalRequest.url?.includes('/applicants/login') ||
            originalRequest.url?.includes('/applicants/register') ||
            originalRequest.url?.includes('/applicants/refresh')

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isAuthEndpoint
        ) {
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
                    useAuthStore.getState().clearTokens()
                    processQueue(error, null)
                    return Promise.reject(error)
                }

                // Attempt refresh — tokens are still in cookies at this point
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

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                // Refresh failed — NOW we clear tokens
                useAuthStore.getState().clearTokens()
                processQueue(refreshError, null)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    },
)

export const useApi = () => {

    /**
     * Helper function to execute API requests with consistent error handling.
     *
     * @param method - HTTP verb (GET, POST, etc.)
     * @param endpoint - The API path (relative to /api)
     * @param data - Optional request payload
     * @returns A promise resolving to an object with { data, error }
     */
    const request = async (method: string, endpoint: string, data?: unknown) => {
        try {
            const response = await api({
                method,
                url: endpoint,
                data,
            })
            return { data: response.data, error: null }
        } catch (err: unknown) {
            let errorMessage = 'Request failed'
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data?.message ||
                    err.response?.data?.data?.message ||
                    err.message ||
                    errorMessage
            } else if (err instanceof Error) {
                errorMessage = err.message
            }
            return {
                data: null,
                error: errorMessage,
            }
        }
    }

    return {
        get: (endpoint: string) => request('GET', endpoint),
        post: (endpoint: string, data: unknown) => request('POST', endpoint, data),
        put: (endpoint: string, data: unknown) => request('PUT', endpoint, data),
        patch: (endpoint: string, data: unknown) => request('PATCH', endpoint, data),
        delete: (endpoint: string) => request('DELETE', endpoint),
    }
}

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
export const useApi = () => {
    const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore()

    /**
     * Request interceptor to attach the current access token to the Authorization header.
     */
    api.interceptors.request.use(
        (config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (error) => Promise.reject(error),
    )

    /**
     * Response interceptor to handle 401 errors and attempt token refresh.
     */
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config

            // Prevent infinite loops by identifying auth-related endpoints
            const isAuthEndpoint = originalRequest.url?.includes('/auth/login') ||
                originalRequest.url?.includes('/auth/refresh') ||
                originalRequest.url?.includes('/auth/register')

            // Logic for handling 401 Unauthorized:
            // 1. Response status must be 401.
            // 2. We haven't already retried this specific request.
            // 3. The failed request is NOT an authentication endpoint itself.
            // 4. We have a refresh token available to attempt the recovery.
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !isAuthEndpoint &&
                refreshToken
            ) {
                originalRequest._retry = true

                try {
                    // Attempt to refresh token using a clean axios instance (not 'api')
                    // to avoid recursive interceptor calls.
                    const { data } = await axios.post('/api/auth/refresh', {
                        refresh_token: refreshToken,
                    })

                    const newAccessToken = data.access_token
                    const newRefreshToken = data.refresh_token

                    // Update stores with new credentials
                    setTokens(newAccessToken, newRefreshToken)

                    // Update the failed request header and retry it
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return api(originalRequest)
                } catch (refreshError) {
                    // If the refresh attempt fails (e.g., refresh token expired),
                    // clear all session data to force a re-login.
                    clearTokens()
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(error)
        },
    )

    /**
     * Helper function to execute API requests with consistent error handling.
     * 
     * @param method - HTTP verb (GET, POST, etc.)
     * @param endpoint - The API path (relative to /api)
     * @param data - Optional request payload
     * @returns A promise resolving to an object with { data, error }
     */
    const request = async (method: string, endpoint: string, data?: any) => {
        try {
            const response = await api({
                method,
                url: endpoint,
                data,
            })
            return { data: response.data, error: null }
        } catch (error: any) {
            return {
                data: null,
                error: error.response?.data?.message || error.message || 'Request failed',
            }
        }
    }

    return {
        get: (endpoint: string) => request('GET', endpoint),
        post: (endpoint: string, data: any) => request('POST', endpoint, data),
        put: (endpoint: string, data: any) => request('PUT', endpoint, data),
        patch: (endpoint: string, data: any) => request('PATCH', endpoint, data),
        delete: (endpoint: string) => request('DELETE', endpoint),
    }
}

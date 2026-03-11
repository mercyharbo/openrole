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

// Response interceptor to handle token refresh on 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // If we get a 401 and haven't tried refreshing yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const { refreshToken, setTokens, clearTokens } = useAuthStore.getState()

                if (!refreshToken) {
                    clearTokens()
                    return Promise.reject(error)
                }

                // Call the refresh endpoint
                const response = await axios.post('/api/auth/refresh', {
                    refresh_token: refreshToken,
                })

                const { access_token, refresh_token } = response.data

                // Update the store and cookies
                setTokens(access_token, refresh_token)

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`
                return api(originalRequest)
            } catch (refreshError) {
                // If refresh also fails, clear credentials and logout
                useAuthStore.getState().clearTokens()
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api

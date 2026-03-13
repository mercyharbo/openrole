import axios from 'axios'
import { useAuthStore } from './store/auth-store'

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

                // Update the store and cookies
                setTokens(newAccessToken, newRefreshToken)

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
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

import api from '@/lib/api'
import { extractErrorMessage } from '@/lib/utils'
import axios from 'axios'

/**
 * Custom hook providing a configured Axios instance with automated token handling.
 */
export const useApi = () => {

    /**
     * Helper function to execute API requests with consistent error handling.
     */
    const request = async (method: string, endpoint: string, data?: unknown) => {
        try {
            const response = await api({
                method,
                url: endpoint,
                data,
            })

            // Check if the response follows the enveloped error pattern even with 200 status
            // Pattern: {"data": {"detail": "Error"}, "error": null} OR {"error": "Error"}
            const resData = response.data
            // Every response from the proxy route.ts is enveloped: { data: ..., error: ... }
            if (resData) {
                // Check for explicit error field first
                if (resData.error !== null && resData.error !== undefined && resData.error !== '') {
                    return { data: null, error: extractErrorMessage(resData) }
                }
                
                // Then check for "logical" error details from backend (FastAPI/etc)
                const logicalError = resData.detail || resData.data?.detail
                if (logicalError) {
                    return { data: null, error: extractErrorMessage(resData) }
                }
            }

            // Unwrap: resData.data is the actual payload from the backend
            return { data: resData?.data ?? resData, error: null }
        } catch (err: unknown) {
            let errorMessage = 'Request failed'
            if (axios.isAxiosError(err) || (err && typeof err === 'object' && 'response' in err)) {
                errorMessage = extractErrorMessage(err)
            } else if (err instanceof Error) {
                errorMessage = err.message
            } else if (typeof err === 'string') {
                errorMessage = err
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

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
            if (resData) {
                // If there's an explicit non-null 'error' field
                if (resData.error !== null && resData.error !== undefined && resData.error !== '') {
                    return { data: null, error: extractErrorMessage(resData) }
                }
                
                // If there's a 'detail' field anywhere that indicates an error
                // In some APIs, detail only exists when there's an error
                const logicalError = (resData.detail || resData.data?.detail)
                if (logicalError) {
                    return { data: null, error: extractErrorMessage(resData) }
                }
            }

            return { data: response.data, error: null }
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

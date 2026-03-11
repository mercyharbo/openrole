import api from '@/lib/api'
import axios from 'axios'
import useSWR, { SWRConfiguration } from 'swr'

export const useFetch = <T = unknown>(
    endpoint: string | null,
    config?: SWRConfiguration
) => {
    const fetcher = async (url: string) => {
        try {
            // endpoint starts with /api/ already because we added it in useSWR key
            const response = await api.get(url)
            return response.data
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                // Axios errors have a response object with potential data
                const message = err.response?.data?.error || err.message || 'Fetch failed'
                throw message
            }
            throw err instanceof Error ? err.message : 'Fetch failed'
        }
    }

    const { data, error, mutate, isValidating } = useSWR<T>(
        endpoint ? `/${endpoint}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            ...config,
        }
    )

    return {
        data: data ?? null,
        error: error,
        isLoading: !error && !data,
        isValidating,
        mutate,
    }
}

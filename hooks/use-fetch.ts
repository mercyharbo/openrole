import api from '@/lib/api'
import useSWR, { SWRConfiguration } from 'swr'

export const useFetch = <T = any>(
    endpoint: string | null,
    config?: SWRConfiguration
) => {
    const fetcher = async (url: string) => {
        try {
            // endpoint starts with /api/ already because we added it in useSWR key
            const response = await api.get(url)
            return response.data
        } catch (error: any) {
            throw error.response?.data?.error || error.message || 'Fetch failed'
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

import api from '@/lib/api'
import { extractErrorMessage } from '@/lib/utils'
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
            const message = extractErrorMessage(err)
            throw message
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
        refresh: mutate,
    }
}

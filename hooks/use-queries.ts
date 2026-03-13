import { Applicant } from '@/types/applicant'
import { Job } from '@/types/jobs'
import { useFetch } from './use-fetch'

/**
 * Centralized file for all GET request hooks (Queries)
 */

// --- APPLICANT QUERIES ---

export const useApplicantProfile = () => {
    const { data: response, error, isLoading, mutate } = useFetch<{ data: Applicant; error: string | null }>('applicants/me', {
        refreshInterval: 300000, // 5 minutes
    })
    return {
        applicant: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshApplicant: mutate,
    }
}



// --- JOB QUERIES ---

export const useJobs = () => {
    const { data: response, error, isLoading, mutate } = useFetch<{ data: Job[]; error: string | null }>('jobs')
    return {
        jobs: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshJobs: mutate,
    }
}




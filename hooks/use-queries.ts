import { Applicant } from '@/types/applicant'
import { Job } from '@/types/jobs'
import { useFetch } from './use-fetch'

/**
 * Centralized file for all GET request hooks (Queries)
 */

// --- APPLICANT QUERIES ---

export const useApplicantProfile = () => {
    const { data: response, error, isLoading, mutate } = useFetch<{ data: Applicant; error: string | null }>('applicants/me', {
        refreshInterval: 10000, // 5 minutes
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

// --- DOCUMENT QUERIES ---

export interface Document {
    id: string
    applicant_id: string
    name: string
    doc_type: string
    file_url: string
    extracted_text: string
    extracted_data: Record<string, unknown>
    created_at: string
}

export const useDocuments = () => {
    const { data: response, error, isLoading, mutate } = useFetch<{ data: Document[]; error: string | null }>('applicants/me/documents')
    return {
        documents: response?.data ?? [],
        error: error || response?.error,
        isLoading,
        refreshDocuments: mutate,
    }
}




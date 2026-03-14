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

export interface AutoApplyPreferences {
    id: string
    applicant_id: string
    job_titles: string[]
    work_modes: string[]
    countries: string[]
    experience_levels: string[]
    salary_min: number
    salary_max: number
    max_daily_applications: number
    is_enabled: boolean
    created_at: string
    updated_at: string
    expanded_titles: string[]
}

export const useAutoApplyPreferences = () => {
    const { data: response, error, isLoading, mutate } = useFetch<{ data: AutoApplyPreferences; error: string | null }>('applicants/auto-apply/preferences')
    return {
        preferences: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshPreferences: mutate,
    }
}

export interface AutoApplyStats {
    total_applications: number
    successful: number
    failed: number
    today_count: number
    daily_limit: number
}

export const useAutoApplyStats = () => {
    const { data: response, error, isLoading, mutate } = useFetch<{ data: AutoApplyStats; error: string | null }>('applicants/auto-apply/stats')
    return {
        stats: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshStats: mutate,
    }
}

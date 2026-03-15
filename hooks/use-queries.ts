import { ApiResponse } from '@/types/api-response'
import { Applicant } from '@/types/applicant'
import { Job } from '@/types/jobs'
import { AutoApplyApplication, AutoApplyPreferences, AutoApplyStats } from '@/types/auto-apply'
import { BillingBalance, BillingHistory, BillingPlan, BillingSubscription } from '@/types/billing'
import { Document } from '@/types/document'
import { useFetch } from './use-fetch'

/**
 * Centralized file for all GET request hooks (Queries)
 */

// --- APPLICANT QUERIES ---

export const useApplicantProfile = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<Applicant>>('applicants/me', {
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
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<Job[]>>('jobs')
    return {
        jobs: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshJobs: mutate,
    }
}

// --- DOCUMENT QUERIES ---

export const useDocuments = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<Document[]>>('applicants/me/documents')
    return {
        documents: response?.data ?? [],
        error: error || response?.error,
        isLoading,
        refreshDocuments: mutate,
    }
}

export const useAutoApplyPreferences = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<AutoApplyPreferences>>('applicants/auto-apply/preferences')
    return {
        preferences: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshPreferences: mutate,
    }
}

export const useAutoApplyStats = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<AutoApplyStats>>('applicants/auto-apply/stats')
    return {
        stats: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshStats: mutate,
    }
}
export const useAutoApplyApplications = (limit: number = 50) => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<AutoApplyApplication[]>>(`applicants/auto-apply/applications?limit=${limit}`)
    return {
        applications: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshApplications: mutate,
    }
}

export const useBillingBalance = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<BillingBalance>>('billing/balance')
    return {
        balance: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshBalance: mutate,
    }
}

export const useBillingPlans = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<BillingPlan[]>>('billing/plans')
    return {
        plans: response?.data ?? [],
        error: error || response?.error,
        isLoading,
        refreshPlans: mutate,
    }
}

export const useBillingSubscription = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<BillingSubscription>>('billing/subscription')
    return {
        subscription: response?.data ?? null,
        error: error || response?.error,
        isLoading,
        refreshSubscription: mutate,
    }
}

export const useBillingHistory = () => {
    const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<BillingHistory[]>>('billing/history')
    return {
        history: response?.data ?? [],
        error: error || response?.error,
        isLoading,
        refreshHistory: mutate,
    }
}

import { Applicant } from '@/types/applicant'
import { User } from '@/types/auth'
import { Job } from '@/types/jobs'
import { RecruiterDashboard, RecruiterProfile } from '@/types/recruiter'
import { useFetch } from './use-fetch'

/**
 * Centralized file for all GET request hooks (Queries)
 */

// --- USER QUERIES ---

export const useUser = () => {
    const { data, error, isLoading, mutate } = useFetch<User>('auth/me')
    return {
        user: data,
        error,
        isLoading,
        refreshUser: mutate,
    }
}

// --- APPLICANT QUERIES ---

export const useApplicant = () => {
    const { data, error, isLoading, mutate } = useFetch<Applicant>('applicants/me')
    return {
        applicant: data,
        error,
        isLoading,
        refreshApplicant: mutate,
    }
}

// --- JOB QUERIES ---

export const useJobs = () => {
    const { data, error, isLoading, mutate } = useFetch<Job[]>('jobs')
    return {
        jobs: data,
        error,
        isLoading,
        refreshJobs: mutate,
    }
}
// --- RECRUITER QUERIES ---

export const useRecruiterProfile = () => {
    const { data, error, isLoading, mutate } = useFetch<RecruiterProfile>('recruiters/profile')
    return {
        recruiterProfile: data,
        error,
        isLoading,
        refreshRecruiterProfile: mutate,
    }
}

export const useRecruiterDashboard = () => {
    const { data, error, isLoading, mutate } = useFetch<RecruiterDashboard>('recruiters/dashboard')
    return {
        dashboardData: data,
        error,
        isLoading,
        refreshDashboard: mutate,
    }
}

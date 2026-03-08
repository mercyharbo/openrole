export interface RecruiterProfile {
    id: string
    email: string
    full_name: string
    company_name: string
    avatar_url: string
    created_at: string
    total_jobs: number
    total_applications: number
}
export interface RecruiterDashboard {
    active_jobs: number
    total_applications: number
    pending: number
    shortlisted: number
}

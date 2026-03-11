export interface Applicant {
    id: string
    email: string
    display_email: string
    full_name: string
    username: string
    x_handle: string
    extracted_profile: Record<string, unknown>
    personal_info: Record<string, unknown>
    job_preferences: Record<string, unknown>
    resolved_profile: Record<string, unknown>
    compliance_data: Record<string, unknown>
    social_links: Record<string, unknown>
    avatar_url: string
    auth_provider: 'email' | string
    resume_url: string
    linkedin_url: string
    x_profile_url: string
    portfolio_url: string
    skills: string[]
    years_experience: number
    current_job_role: string
    current_company: string
    previous_roles: unknown[]
    current_seniority: 'intern' | 'junior' | 'mid' | 'senior' | 'lead' | string
    location: string
    timezone: string
    education: string
    work_history: Record<string, unknown>[]
    created_at: string
}

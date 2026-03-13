export interface SocialLinks {
    linkedin_url?: string | null
    github_url?: string | null
    x_url?: string | null
    instagram_url?: string | null
    reddit_url?: string | null
    website_url?: string | null
    portfolio_urls?: string | null
}

export interface Applicant {
    id: string
    email: string
    display_email: string | null
    full_name: string
    username: string
    x_handle: string | null
    extracted_profile: Record<string, unknown> | null
    personal_info: Record<string, unknown> | null
    job_preferences: Record<string, unknown> | null
    resolved_profile: Record<string, unknown> | null
    compliance_data: Record<string, unknown> | null
    social_links: SocialLinks | null
    avatar_url: string | null
    auth_provider: 'email' | string
    resume_url: string | null
    linkedin_url: string | null
    x_profile_url: string | null
    portfolio_url: string | null
    skills: string[]
    years_experience: number | null
    current_job_role: string | null
    current_company: string | null
    previous_roles: unknown[]
    current_seniority: 'intern' | 'junior' | 'mid' | 'senior' | 'lead' | string | null
    location: string | null
    timezone: string | null
    education: string | null
    work_history: Record<string, unknown>[]
    created_at: string
}


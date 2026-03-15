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

export interface AutoApplyStats {
    total_applications: number
    successful: number
    failed: number
    today_count: number
    daily_limit: number
}

export interface AutoApplyApplication {
    id: string
    applicant_id: string
    job_url: string
    job_title: string
    company: string
    status: string
    error_message: string | null
    screenshot_url: string | null
    filled_data: Record<string, unknown>
    cover_letter_used: string | null
    resume_url_used: string | null
    applied_at: string
    created_at: string
    match_score: number
    ai_match_reason: string | null
    responses: string[]
}

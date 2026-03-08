export type JobSeniority = 'intern' | 'junior' | 'mid' | 'senior' | 'lead' | 'expert'
export type JobRoleType = 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship'

export interface Job {
    id: string
    recruiter_id: string
    slug: string
    title: string
    raw_description: string
    required_skills: string[]
    nice_to_have_skills: string[]
    seniority: JobSeniority
    role_type: JobRoleType
    location_preference: string
    timezone_preference: string
    years_experience_min: number
    years_experience_max: number
    industry: string
    is_active: boolean
    created_at: string
    application_count: number
    ideal_candidate_brief: string
}

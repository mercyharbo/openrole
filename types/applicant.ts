export interface SocialLinks {
    linkedin_url?: string | null
    github_url?: string | null
    x_url?: string | null
    instagram_url?: string | null
    reddit_url?: string | null
    website_url?: string | null
    portfolio_urls?: string | null
}

export interface PersonalInfo {
    phone: string | null
    nationality: string | null
    address_city: string | null
    address_state: string | null
    date_of_birth: string | null
    address_street: string | null
    address_country: string | null
    address_postal_code: string | null
    country_of_residence: string | null
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    emergency_contact_relationship: string | null
}

export interface JobPreferences {
    job_types: string[] | null
    notice_period: string | null
    referral_source: string | null
    work_arrangement: string | null
    travel_willingness: string | null
    earliest_start_date: string | null
    preferred_locations: string[] | null
    willing_to_relocate: boolean | null
}

export interface ComplianceData {
    gender: string | null
    right_to_work_eu: boolean | null
    right_to_work_uk: boolean | null
    right_to_work_us: boolean | null
    disability_status: string | null
    protected_veteran: boolean | null
    security_clearance: boolean | null
    work_authorization: boolean | null
    criminal_conviction: string | null
    requires_sponsorship: boolean | null
    right_to_work_canada: boolean | null
    right_to_work_australia: boolean | null
}

export interface EducationEntry {
    gpa: string | number | null
    degree: string | null
    honors: string[] | null
    institution: string | null
    field_of_study: string | null
    graduation_year: string | number | null
    relevant_coursework: string[] | null
}

export interface WorkHistoryEntry {
    role: string | null
    company: string | null
    duration: string | null
    end_date: string | null
    location: string | null
    highlights: string[] | null
    start_date: string | null
}

export interface ExtractedProfile {
    skills: string[]
    projects: unknown[]
    education: EducationEntry[]
    languages: string[]
    basic_profile: {
        email: string | null
        phone: string | null
        full_name: string | null
        primary_role: string | null
        current_company: string | null
        seniority_level: string | null
        years_of_experience: number | null
    }
    skill_profile: Array<{
        skill: string
        category: string
        evidence: string
        years_used: number
        proficiency: string
        usage_context: string
        last_used_year: number
    }>
    career_signals: {
        trajectory: string | null
        career_gaps: boolean | null
        promotion_count: number | null
        total_companies: number | null
        career_transitions: boolean | null
        specialization_level: string | null
        average_tenure_months: number | null
        leadership_experience: string | null
        role_progression_pattern: string | null
    }
    certifications: unknown[]
    profile_summary: {
        headline: string | null
        red_flags: string[]
        typical_roles: string[]
        core_strengths: string[]
        executive_summary: string | null
        experience_themes: string[]
        notable_achievements: string[]
        ideal_role_indicators: string[]
    }
    raw_resume_text: string | null
    work_style_signals: {
        autonomy_level: string | null
        collaboration_style: string | null
        communication_indicators: string[]
        problem_solving_examples: string[]
    }
    portfolio_and_links: {
        x_url: string | null
        github_url: string | null
        other_links: unknown[]
        linkedin_url: string | null
        portfolio_url: string | null
        personal_website: string | null
    }
    publications_and_talks: unknown[]
    professional_experience: Array<{
        role: string | null
        company: string | null
        summary: string | null
        duration: string | null
        end_date: string | null
        industry: string | null
        location: string | null
        is_current: boolean
        start_date: string | null
        remote_type: string | null
        company_type: string | null
        employment_type: string | null
        key_contributions: Array<{
            action: string
            metrics: string | null
            outcome: string
        }>
        team_size_managed: number | null
        technologies_used: string[]
        responsibility_scope: string | null
    }>
    availability_and_location: {
        timezone: string | null
        visa_status: string | null
        notice_period: string | null
        current_location: string | null
        remote_preference: string | null
        willing_to_relocate: boolean | null
    }
    work_environment_experience: {
        agency_experience: boolean
        remote_experience: boolean
        scaleup_experience: boolean
        startup_experience: boolean
        industries_worked_in: string[]
        enterprise_experience: boolean
        international_experience: boolean
        distributed_team_experience: boolean
    }
}

export interface ResolvedProfile {
    email: string | null
    phone: string | null
    skills: string[]
    summary: string | null
    location: string | null
    education: string | null
    full_name: string | null
    languages: string[]
    work_history: WorkHistoryEntry[]
    certifications: unknown[]
    education_list: EducationEntry[]
    current_company: string | null
    current_job_role: string | null
    years_experience: number | null
    current_seniority: string | null
}

export interface Applicant {
    id: string
    email: string
    display_email: string | null
    full_name: string
    username: string
    x_handle: string | null
    extracted_profile: ExtractedProfile | null
    personal_info: PersonalInfo | null
    job_preferences: JobPreferences | null
    resolved_profile: ResolvedProfile | null
    compliance_data: ComplianceData | null
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
    work_history: WorkHistoryEntry[]
    created_at: string
}

export interface User {
    id: string
    email: string
    full_name: string
    company_name?: string
    auth_provider?: string
    avatar_url?: string | null
    role?: 'applicant' | 'recruiter'
}

export interface AuthTokens {
    access_token: string
    refresh_token: string
    token_type: string
}

export interface LoginResponse {
    success: boolean
    message: string
    data: User
    tokens: AuthTokens
}

export interface ApplicantLoginResponse {
    access_token?: string
    refresh_token?: string
    token_type?: string
    role?: "applicant"
    user_id?: string
    full_name?: string
    // In case it's nested like LoginResponse
    tokens?: AuthTokens
    data?: {
        id?: string
        user_id?: string
        email?: string
        full_name?: string
    }
}



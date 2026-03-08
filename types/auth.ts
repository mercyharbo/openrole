export interface User {
    id: string
    email: string
    full_name: string
    company_name: string
    auth_provider: string
    avatar_url: string | null
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

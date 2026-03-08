export interface ApiResponse<T = any> {
    data: T | null
    error: string | null
}

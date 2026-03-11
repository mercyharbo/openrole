import { User } from '@/types/auth'
import Cookies from 'universal-cookie'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const cookies = new Cookies()

interface AuthState {
    isSubmitting: boolean
    setIsSubmitting: (isSubmitting: boolean) => void
    registrationEmail: string
    setRegistrationEmail: (email: string) => void
    otpValue: string
    setOtpValue: (value: string) => void
    registrationTimer: number
    setRegistrationTimer: (timer: number) => void
    firstName: string
    setFirstName: (name: string) => void
    lastName: string
    setLastName: (name: string) => void
    passwordValue: string
    setPasswordValue: (value: string) => void
    confirmPasswordValue: string
    setConfirmPasswordValue: (value: string) => void
    userRole: 'applicant' | 'recruiter' | ''
    setUserRole: (role: 'applicant' | 'recruiter' | '') => void
    companyName: string
    setCompanyName: (name: string) => void
    username: string
    setUsername: (name: string) => void
    user: User | null
    setUser: (user: User | null) => void
    accessToken: string
    refreshToken: string
    setTokens: (accessToken: string, refreshToken: string) => void
    clearTokens: () => void
    registrationError: string | null
    setRegistrationError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isSubmitting: false,
            setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
            registrationEmail: '',
            setRegistrationEmail: (email) => set({ registrationEmail: email }),
            otpValue: '',
            setOtpValue: (value) => set({ otpValue: value }),
            registrationTimer: 30,
            setRegistrationTimer: (timer) => set({ registrationTimer: timer }),
            firstName: '',
            setFirstName: (firstName) => set({ firstName }),
            lastName: '',
            setLastName: (lastName) => set({ lastName }),
            passwordValue: '',
            setPasswordValue: (passwordValue) => set({ passwordValue }),
            confirmPasswordValue: '',
            setConfirmPasswordValue: (confirmPasswordValue) =>
                set({ confirmPasswordValue }),
            userRole: '',
            setUserRole: (userRole) => set({ userRole }),
            companyName: '',
            setCompanyName: (companyName) => set({ companyName }),
            username: '',
            setUsername: (username) => set({ username }),
            user: null,
            setUser: (user) => set({ user }),
            accessToken: cookies.get('access_token') || '',
            refreshToken: cookies.get('refresh_token') || '',
            setTokens: (accessToken, refreshToken) => {
                const options = { path: '/', maxAge: 30 * 24 * 60 * 60 } // 30 days
                cookies.set('access_token', accessToken, options)
                cookies.set('refresh_token', refreshToken, options)
                set({ accessToken, refreshToken })
            },
            clearTokens: () => {
                cookies.remove('access_token', { path: '/' })
                cookies.remove('refresh_token', { path: '/' })
                set({ accessToken: '', refreshToken: '', user: null })
            },
            registrationError: null,
            setRegistrationError: (registrationError) => set({ registrationError }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                registrationEmail: state.registrationEmail,
                userRole: state.userRole,
            }),
        }
    )
)


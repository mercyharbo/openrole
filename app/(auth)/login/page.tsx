"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useApi } from "@/hooks/use-api"
import { useAuthStore } from "@/lib/store/auth-store"
import { ApplicantLoginResponse, User } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

/**
 * Login page component handling user authentication.
 * Provides a form for email and password entry with validation.
 */
export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect_to")
  
  const { 
    userRole, 
    setUserRole, 
    isSubmitting, 
    setIsSubmitting, 
    setTokens, 
    setUser 
  } = useAuthStore()
  const [loginError, setLoginError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)


  // Ensure a role is selected, default to applicant if none
  useEffect(() => {
    if (!userRole) {
      setUserRole("applicant")
    }
  }, [userRole, setUserRole])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const { post } = useApi()

  /**
   * Handles the login form submission for applicants.
   * Sends credentials to the applicant-specific API endpoint.
   */
  const handleLoginSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    setLoginError(null)

    const response = await post("/applicants/login", data)

    if (response.error) {
      console.error("Login failed:", response.error)
      setLoginError(response.error)
    } else {
      const rawResponse = response.data
      const loginData = (rawResponse?.data || rawResponse) as ApplicantLoginResponse
      
      const accessToken = loginData.access_token || loginData.tokens?.access_token
      const refreshToken = loginData.refresh_token || loginData.tokens?.refresh_token
      
      if (!accessToken || !refreshToken) {
        console.error("Login tokens missing. Raw response:", rawResponse)
        setLoginError("Login failed: Invalid response from server")
        setIsSubmitting(false)
        return
      }

      // Store tokens and set role explicitly to applicant
      setTokens(accessToken, refreshToken)
      setUserRole("applicant")
      
      const userData: User = {
        id: loginData.user_id || loginData.data?.user_id || loginData.data?.id || "",
        full_name: loginData.full_name || loginData.data?.full_name || "Applicant",
        email: data.email,
        role: "applicant"
      }
      setUser(userData)
      
      router.push(redirectTo || "/dashboard")
    }

    setIsSubmitting(false)
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft size={18} />
            Go back
          </Link>
        </Button>

        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Button
            variant={"link"}
            className="h-fit px-0 font-medium text-primary no-underline"
            asChild
          >
            <Link
              href={`/register${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            >
              Sign up
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center w-full py-10">
        <div className="3xl:max-w-2xl w-full max-w-sm space-y-8 sm:max-w-md md:max-w-lg lg:max-w-xl">
          {/* Title & Subtext */}
          <div className="space-y-2">
            <h1 className="text-2xl font-medium text-zinc-950 dark:text-zinc-50">
              Sign In
            </h1>
            <p className="text-sm text-balance text-zinc-600 dark:text-zinc-400">
              Fill your details to access your account as an applicant
            </p>
          </div>

        {/* Sign In Form */}
        <form className="space-y-6 " onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
              >
                Email Address
              </label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter email address"
                className={cn(
                  "border-auth-border rounded-auth-input focus-visible:ring-auth-input-focus h-12 bg-white px-4 text-sm placeholder:text-black/40 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-white/40",
                  errors.email && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={cn(
                    "border-auth-border rounded-auth-input focus-visible:ring-auth-input-focus h-12 bg-white px-4 pr-12 text-sm placeholder:text-black/40 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-white/40",
                    errors.password &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Options: Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center">
                  <input
                    {...register("remember")}
                    type="checkbox"
                    id="remember"
                    className="peer border-auth-border checked:bg-auth-input-focus checked:border-auth-input-focus size-4 cursor-pointer appearance-none rounded border transition-all"
                  />
                  <svg
                    className="pointer-events-none absolute left-0.5 hidden size-3 text-white peer-checked:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm font-medium text-zinc-900 dark:text-zinc-400"
                >
                  Remember password
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
              {loginError}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="flex h-12 w-full items-center justify-center gap-2 bg-[#172554] font-medium text-white hover:bg-blue-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Sign In
          </Button>
        </form>

        <div className=""></div>
      </div>
    </div>
    </>
  )
}

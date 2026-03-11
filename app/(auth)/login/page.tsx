"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useApi } from "@/hooks/use-api"
import { useAuthStore } from "@/lib/store/auth-store"
import { LoginResponse } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
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
  const router = useRouter()
  const { isSubmitting, setIsSubmitting, setTokens, setUser } = useAuthStore()
  const [loginError, setLoginError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

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
   * Handles the login form submission.
   * Sends user credentials to the API, stores session tokens/profile on success,
   * and redirects the user to the home page.
   *
   * @param data - The validated login form values (email, password, remember)
   */
  const handleLoginSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    setLoginError(null)

    const response = await post("/auth/login", data)

    if (response.error) {
      console.error("Login failed:", response.error)
      setLoginError(response.error)
    } else {
      const loginData = response.data as LoginResponse

      // Store tokens and user data
      setTokens(loginData.tokens.access_token, loginData.tokens.refresh_token)
      setUser(loginData.data)

      console.log("Login success:", loginData.message)

      // Redirect to home/dashboard
      router.push("/dashboard")
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

        <div className="flex items-center gap-3 text-sm dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Button
            variant={"link"}
            className="h-fit px-0 font-semibold text-primary no-underline"
            asChild
          >
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </div>

      <div className="3xl:max-w-2xl w-full max-w-sm space-y-8 sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* Title & Subtext */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
            Sign In
          </h1>
          <p className="text-sm text-balance text-black dark:text-gray-400">
            Fill your details to access your account
          </p>
        </div>

        {/* Sign In Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-label block text-sm font-semibold"
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
                className="text-label block text-sm font-semibold"
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
                  className="text-label cursor-pointer text-sm font-semibold"
                >
                  Remember password
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-black transition-colors hover:text-primary dark:text-gray-400"
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
            className="flex h-12 w-full items-center justify-center gap-2 font-semibold transition-all dark:text-white"
          >
            Sign In
          </Button>
        </form>
      </div>

      <div className=""></div>
    </>
  )
}

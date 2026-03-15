"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApi } from "@/hooks/use-api"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"
import { LoginResponse as RegistrationResponse } from "@/types/auth"
import { Check, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsForm />
    </Suspense>
  )
}

function DetailsForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect_to")

  const {
    userRole,
    registrationEmail,
    setRegistrationEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    passwordValue,
    setPasswordValue,
    confirmPasswordValue,
    setConfirmPasswordValue,
    companyName,
    setCompanyName,
    isSubmitting,
    setIsSubmitting,
    registrationError,
    setRegistrationError,
    setTokens,
    setUser,
  } = useAuthStore()

  const { post } = useApi()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Redirect if no role selected
  useEffect(() => {
    if (!userRole) {
      router.replace("/register")
    }
  }, [userRole, router])

  const passwordRequirements = [
    { label: "At least one uppercase letter.", regex: /[A-Z]/ },
    { label: "At least one lower letter.", regex: /[a-z]/ },
    { label: "At least one number.", regex: /[0-9]/ },
    { label: "At least one character (!@#S%^&)", regex: /[!@#$%^&*]/ },
  ]

  const isPasswordValid = passwordRequirements.every((req) =>
    req.regex.test(passwordValue)
  )

  const isFormValid =
    registrationEmail.trim() !== "" &&
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    (userRole === "recruiter"
      ? companyName.trim() !== ""
      : username.trim() !== "") &&
    isPasswordValid &&
    passwordValue === confirmPasswordValue

  /**
   * Finalizes registration by sending data to the appropriate API endpoint.
   * Handles both Applicant and Recruiter flows with specific payloads.
   */
  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setRegistrationError(null)

    const fullName = `${firstName} ${lastName}`.trim()

    let endpoint = ""
    let payload = {}

    if (userRole === "applicant") {
      endpoint = "/applicants/register"
      payload = {
        email: registrationEmail,
        password: passwordValue,
        full_name: fullName,
        username: username,
      }
    } else {
      endpoint = "/auth/register"
      payload = {
        email: registrationEmail,
        password: passwordValue,
        full_name: fullName,
        company_name: companyName,
      }
    }

    const response = await post(endpoint, payload)

    if (response.error) {
      console.error("Registration failed:", response.error)
      setRegistrationError(response.error)
    } else if (response.data && response.data.success === false) {
      setRegistrationError(response.data.message || "Registration failed")
    } else {
      const regData = response.data as RegistrationResponse
      setTokens(regData.tokens.access_token, regData.tokens.refresh_token)
      setUser(regData.data)
      console.log("Registration success:", regData.message)
      router.push(redirectTo || "/dashboard")
    }

    setIsSubmitting(false)
  }

  if (!userRole) return null

  return (
    <div className="3xl:max-w-2xl w-full max-w-sm space-y-8 sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="space-y-3">
        <h1 className="text-3xl font-medium text-zinc-950 dark:text-zinc-50">
          Complete your registration
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          As a {userRole === "applicant" ? "Talent" : "Employer"}, please
          provide your details
        </p>
      </div>

      <form onSubmit={handleComplete} className="space-y-10">
        <div className="space-y-6">
          {/* Email Address */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Email Address*
            </label>
            <Input
              type="email"
              placeholder="ezeumechukwu@gmail.com"
              value={registrationEmail}
              onChange={(e) => setRegistrationEmail(e.target.value)}
              className="h-12 rounded-lg border-zinc-200 bg-zinc-50/50 text-zinc-950 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            />
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                First Name*
              </label>
              <Input
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 rounded-lg border-zinc-200 bg-zinc-50/50 text-zinc-950 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Last Name*
              </label>
              <Input
                placeholder="Osimhen"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 rounded-lg border-zinc-200 bg-zinc-50/50 text-zinc-950 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Role specific field */}
          {userRole === "recruiter" ? (
            <div className="flex flex-col gap-3">
              <label className="text-label text-sm dark:text-gray-300">
                Company Name*
              </label>
              <Input
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-12 rounded-lg border-slate-200 bg-slate-50/50 placeholder:text-black/40 dark:border-slate-800 dark:bg-slate-900/50 dark:placeholder:text-white/40"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Username*
              </label>
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-lg border-zinc-200 bg-zinc-50/50 text-zinc-950 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              />
            </div>
          )}

          {/* Password Field */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                className="h-12 rounded-lg border-zinc-200 bg-zinc-50/50 pr-12 text-zinc-950 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Checklist */}
          {passwordValue && (
            <div className="space-y-2 py-1">
              {passwordRequirements.map((req, idx) => {
                const met = req.regex.test(passwordValue)
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "size-4 transition-colors",
                        met ? "text-[#00D8AF]" : "text-black/20"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium transition-colors",
                        met
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-400 dark:text-zinc-500"
                      )}
                    >
                      {req.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                className="h-12 rounded-lg border-zinc-200 bg-zinc-50/50 pr-12 text-zinc-950 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {registrationError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            {registrationError}
          </div>
        )}

        <div className="space-y-8 pt-4">
          <p className="text-sm leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
            By signing up you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-zinc-950 underline dark:text-zinc-50"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-zinc-950 underline dark:text-zinc-50"
            >
              Privacy Policy
            </Link>
          </p>

          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="text-md h-12 w-full font-medium bg-[#172554] text-white hover:bg-blue-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            {isSubmitting ? "Creating account..." : "Create your account"}
          </Button>
        </div>
      </form>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApi } from "@/hooks/use-api"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"
import { LoginResponse as RegistrationResponse } from "@/types/auth"
import { Check, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetailsPage() {
  const router = useRouter()
  const {
    registrationEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
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

  // Redirect if no email
  useEffect(() => {
    if (!registrationEmail) {
      router.replace("/register")
    }
  }, [registrationEmail, router])

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
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    companyName.trim() !== "" &&
    isPasswordValid &&
    passwordValue === confirmPasswordValue

  /**
   * Finalizes registration by sending data to the API.
   * Concatenates name fields, includes company information,
   * handles session storage on success, and redirects to home.
   */
  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setRegistrationError(null)

    const payload = {
      email: registrationEmail,
      password: passwordValue,
      full_name: `${firstName} ${lastName}`.trim(),
      company_name: companyName,
    }

    const response = await post("/auth/register", payload)

    if (response.error) {
      console.error("Registration failed:", response.error)
      setRegistrationError(response.error)
    } else {
      const regData = response.data as RegistrationResponse

      // Store tokens and user data
      setTokens(regData.tokens.access_token, regData.tokens.refresh_token)
      setUser(regData.data)

      console.log("Registration success:", regData.message)

      // Redirect directly to home (skipping role for now)
      router.push("/dashboard")
    }

    setIsSubmitting(false)
  }

  if (!registrationEmail) return null

  return (
    <div className="3xl:max-w-2xl w-full max-w-sm space-y-8 sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Sign up
        </h1>
        <p className="text-label text-sm dark:text-gray-400">
          To get started, fill in the information
        </p>
      </div>

      <form onSubmit={handleComplete} className="space-y-10">
        <div className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <label className="text-label text-sm dark:text-gray-300">
                First Name*
              </label>
              <Input
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 rounded-lg border-slate-200 bg-slate-50/50 placeholder:text-black/40 dark:border-slate-800 dark:bg-slate-900/50 dark:placeholder:text-white/40"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-label text-sm dark:text-gray-300">
                Last Name*
              </label>
              <Input
                placeholder="Osimhen"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 rounded-lg border-slate-200 bg-slate-50/50 placeholder:text-black/40 dark:border-slate-800 dark:bg-slate-900/50 dark:placeholder:text-white/40"
              />
            </div>
          </div>

          {/* Company Name Field */}
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

          {/* Password Field */}
          <div className="flex flex-col gap-3">
            <label className="text-label text-sm dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                className="h-12 rounded-lg border-slate-200 bg-slate-50/50 pr-12 placeholder:text-black/40 dark:border-slate-800 dark:bg-slate-900/50 dark:placeholder:text-white/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-black/40 transition-colors hover:text-black/60 dark:text-white/40 dark:hover:text-white/60"
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
                        "text-xs transition-colors",
                        met
                          ? "text-black dark:text-white"
                          : "text-black/40 dark:text-white/40"
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
            <label className="text-label text-sm dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                className="h-12 rounded-lg border-slate-200 bg-slate-50/50 pr-12 placeholder:text-black/40 dark:border-slate-800 dark:bg-slate-900/50 dark:placeholder:text-white/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-black/40 transition-colors hover:text-black/60 dark:text-white/40 dark:hover:text-white/60"
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
          <p className="text-sm leading-relaxed font-medium text-black/60 dark:text-white/60">
            By signing up you agree to our{" "}
            <Link
              href="/terms"
              className="font-semibold text-black underline dark:text-white"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-black underline dark:text-white"
            >
              Privacy Policy
            </Link>
          </p>

          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="text-md h-12 w-full font-semibold"
          >
            {isSubmitting ? "Creating account..." : "Create your account"}
          </Button>
        </div>
      </form>
    </div>
  )
}

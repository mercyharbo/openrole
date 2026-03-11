"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuthStore } from "@/lib/store/auth-store"

export default function VerifyEmailPage() {
  const router = useRouter()
  const {
    registrationEmail,
    isSubmitting,
    setIsSubmitting,
    otpValue,
    setOtpValue,
    registrationTimer,
    setRegistrationTimer,
  } = useAuthStore()
  const [isError, setIsError] = useState(false)

  // If no email is present (e.g. direct access), redirect back to register
  useEffect(() => {
    if (!registrationEmail) {
      router.replace("/register")
    }
  }, [registrationEmail, router])

  const isOtpValid = otpValue.length === 6

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (registrationTimer > 0) {
      interval = setInterval(() => {
        setRegistrationTimer(registrationTimer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [registrationTimer, setRegistrationTimer])

  const handleVerify = async () => {
    setIsSubmitting(true)
    setIsError(false)
    console.log("Verifying OTP:", otpValue)

    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false)
      // Simulate an error for demonstration if code is '000000'
      if (otpValue === "000000") {
        setIsError(true)
      } else {
        router.push("/register/details")
      }
    }, 1500)
  }

  const handleResend = () => {
    if (registrationTimer === 0) {
      setRegistrationTimer(30)
      // Logic to resend OTP
      console.log("Resending OTP to:", registrationEmail)
    }
  }

  if (!registrationEmail) return null

  return (
    <div className="3xl:max-w-2xl w-full space-y-12 lg:max-w-xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Verify your email address
        </h1>
        <p className="text-sm text-black dark:text-gray-400">
          Enter the 6 digit code sent to {registrationEmail}
        </p>
      </div>

      <div className="space-y-10">
        {/* OTP Input Group */}
        <div className="flex items-center">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
          >
            <InputOTPGroup className="gap-5">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={cn(
                    "rounded-xl border-2 transition-colors",
                    isError
                      ? "border-destructive"
                      : isOtpValid
                        ? "border-[#00D8AF]"
                        : "border-slate-200 dark:border-slate-800"
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="space-y-6">
          <Button
            onClick={handleVerify}
            disabled={isSubmitting || !isOtpValid}
            className="text-md h-12 w-full font-semibold text-white disabled:text-black/20 dark:disabled:text-white/20"
          >
            Verify
          </Button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-black dark:text-gray-400">
              Didn&apos;t receive the code?
            </span>
            <button
              disabled={registrationTimer > 0}
              onClick={handleResend}
              className={cn(
                "font-medium transition-colors",
                registrationTimer > 0
                  ? "cursor-not-allowed text-black/40 dark:text-white/40"
                  : "text-primary hover:underline"
              )}
            >
              Send again
            </button>
            {registrationTimer > 0 && (
              <span className="text-black dark:text-white">
                00.{registrationTimer.toString().padStart(2, "0")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

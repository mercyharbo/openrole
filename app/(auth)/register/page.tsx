"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useApi } from "@/hooks/use-api"
import { useAuthStore } from "@/lib/store/auth-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const GoogleIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
)

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { isSubmitting, setIsSubmitting, setRegistrationEmail } = useAuthStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  })

  const email = watch("email")
  const isFormValid = !!email

  const { post } = useApi()

  /**
   * Handles the first step of registration by storing the email
   * and moving the user to the account details step (skipping verification for now).
   *
   * @param data - The form data containing the user's email.
   */
  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true)
    setRegistrationEmail(data.email)
    setIsSubmitting(false)
    router.push("/register/details")
  }

  return (
    <div className="3xl:max-w-2xl w-full max-w-sm space-y-8 sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">
          Create your account
        </h1>
        <p className="text-label text-sm dark:text-gray-400">
          To get started, fill in the information
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(handleRegisterSubmit)}>
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="email"
              className="text-label block text-sm dark:text-gray-300"
            >
              Email Address
            </label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="ezeumechukwu@gmail.com"
              className={cn(
                "text-md h-12 rounded-lg border-slate-200 bg-slate-50/50 px-4 placeholder:text-black/40 focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-900/50 dark:placeholder:text-white/40",
                errors.email && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
            <span className="text-sm font-medium text-black/60 dark:text-white/60">
              Or
            </span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="text-md flex h-12 w-full items-center justify-center gap-3 rounded-lg border-slate-300 bg-white font-semibold text-black hover:bg-slate-50 dark:border-slate-700 dark:bg-zinc-950 dark:text-white dark:hover:bg-slate-900"
          >
            <GoogleIcon />
            Continue With Google
          </Button>
        </div>

        <div className="space-y-8">
          <p className="text-sm leading-relaxed text-black dark:text-gray-400">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="text-black underline dark:text-white"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-black underline dark:text-white"
            >
              Privacy Policy
            </Link>
          </p>

          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="h-12 w-full"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

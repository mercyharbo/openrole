"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterRoleSelection />
    </Suspense>
  )
}

function RegisterRoleSelection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userRole, setUserRole } = useAuthStore()

  const roles = [
    {
      id: "applicant",
      title: "Talent / Freelancer",
      description: "I'm a freelancer looking for opportunities and work.",
    },
    {
      id: "recruiter",
      title: "Employer",
      description: "I'm an employer seeking qualified talents to work with.",
    },
  ]

  const handleContinue = () => {
    if (userRole) {
      const queryString = searchParams.toString()
      router.push(`/register/details${queryString ? `?${queryString}` : ""}`)
    }
  }

  return (
    <div className="3xl:max-w-2xl flex w-full max-w-sm flex-col items-center space-y-8 sm:max-w-md md:max-w-lg lg:max-w-xl">
      {/* Illustration */}
      <div className="relative h-[280px] w-[280px] lg:h-[320px] lg:w-[320px]">
        <Image
          src="/register-img.png"
          alt="Character Group Illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-medium text-zinc-950 lg:text-3xl dark:text-zinc-50">
          Choose who you are
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          To get started, select your role
        </p>
      </div>

      <RadioGroup
        value={userRole}
        onValueChange={(value) =>
          setUserRole(value as "applicant" | "recruiter")
        }
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
      >
        {roles.map((role) => (
          <Card
            key={role.id}
            className={cn(
              "flex min-h-[160px] cursor-pointer flex-col gap-4 border-gray-400 p-6 shadow-none transition-all dark:border-zinc-800",
              userRole === role.id
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "bg-white dark:bg-zinc-950"
            )}
            onClick={() => setUserRole(role.id as "applicant" | "recruiter")}
          >
            <div className="flex items-center justify-between">
              <RadioGroupItem
                value={role.id}
                id={role.id}
                className="size-5 border"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                {role.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {role.description}
              </p>
            </div>
          </Card>
        ))}
      </RadioGroup>

      {/* Bottom Nav */}
      <div className="flex w-full flex-col gap-4 pt-8">
        <Button
          onClick={handleContinue}
          disabled={!userRole}
          className="h-12 w-full font-medium bg-[#172554] text-white hover:bg-blue-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Continue
        </Button>
        <Button
          variant="secondary"
          className="text-md h-12 w-full bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
          asChild
        >
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}

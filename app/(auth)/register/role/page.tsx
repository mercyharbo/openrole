"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RolePage() {
  const router = useRouter()
  const { registrationEmail, userRole, setUserRole } = useAuthStore()

  // Redirect if no email
  useEffect(() => {
    if (!registrationEmail) {
      router.replace("/register")
    }
  }, [registrationEmail, router])

  const roles = [
    {
      id: "talent",
      title: "Talent / Freelancer",
      description: "I'm a freelancer looking for workf afsdfad", // Text from image
    },
    {
      id: "employer",
      title: "Employer",
      description: "I'm an employer seeking qualified talents to work with.",
    },
  ]

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
        <h1 className="text-2xl font-bold text-black lg:text-3xl dark:text-white">
          Choose who you are
        </h1>
      </div>

      <RadioGroup
        value={userRole}
        onValueChange={(value) => setUserRole(value as any)}
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
            onClick={() => setUserRole(role.id as any)}
          >
            <div className="flex items-center justify-between">
              <RadioGroupItem
                value={role.id}
                id={role.id}
                className="size-5 border"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                {role.title}
              </h2>
              <p className="text-label text-sm dark:text-gray-400">
                {role.description}
              </p>
            </div>
          </Card>
        ))}
      </RadioGroup>

      {/* Bottom Nav */}
      <div className="w-full pt-8">
        <Button
          variant="secondary"
          className="text-md h-12 w-full bg-[#E4E6EB] font-semibold text-black hover:bg-[#D8DADF] dark:bg-[#1E1F22] dark:text-white dark:hover:bg-[#2D2F33]"
          asChild
        >
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}

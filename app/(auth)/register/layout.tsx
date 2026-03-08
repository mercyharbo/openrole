"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"

export default function RegisterLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isVerifyPage = pathname.endsWith("verify-email")

  return (
    <div className="flex h-full w-full flex-col">
      {/* Shared Navigation Header */}
      <div className="mb-10 flex w-full items-center justify-between">
        {isVerifyPage ? (
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-2"
          >
            <ChevronLeft />
            Go back
          </Button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3 text-sm dark:text-gray-400">
          Already have an account?{" "}
          <Button
            variant={"link"}
            className="h-fit px-0 font-semibold text-black no-underline dark:text-white"
            asChild
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>

      {/* Step Content Content */}
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  )
}

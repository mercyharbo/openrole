"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuthStore } from "@/lib/store/auth-store"
import { usePathname } from "next/navigation"
import React from "react"

const Icons = {
  Document: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  ArrowLeft: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
}

export function MarketingHeader() {
  const pathname = usePathname()
  const { accessToken } = useAuthStore()
  const isLegalPage = pathname === "/privacy" || pathname === "/terms"

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {isLegalPage ? (
          <Link href="/" className="group flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-primary dark:text-zinc-400">
            <Icons.ArrowLeft className="size-4" />
            Back to Home
          </Link>
        ) : (
          <Link href="/" className="group flex cursor-pointer items-center gap-2">
            <Icons.Document className="size-6 text-primary" />
            <span className="text-2xl font-bold italic">OpenRole</span>
          </Link>
        )}

        {!isLegalPage && (
          <div className="hidden items-center gap-12 text-sm font-medium text-zinc-600 lg:flex dark:text-zinc-400">
            <Link href="#features" className="transition-colors hover:text-primary">Features</Link>
            <Link href="#process" className="transition-colors hover:text-primary">How it works</Link>
            <Link href="/privacy" className="transition-colors hover:text-primary">Privacy</Link>
          </div>
        )}

        <div className="flex items-center gap-5">
          {isLegalPage && (
            <div className="hidden items-center gap-2 sm:flex">
              <Icons.Document className="size-5 text-primary" />
              <span className="text-lg font-bold italic">OpenRole</span>
            </div>
          )}
          {accessToken ? (
            <Link href="/dashboard">
              <Button className="h-11 rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-xl transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button className="h-11 rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-xl transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

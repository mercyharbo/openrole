"use client"

import Link from "next/link"
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
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-zinc-100 bg-white px-6 py-20 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="mx-auto flex h-20 max-w-7xl flex-col gap-16">
        <div className="grid gap-16 lg:grid-cols-4">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Icons.Document className="size-6 text-primary" />
              <span className="text-2xl font-bold italic">OpenRole</span>
            </div>
            <p className="max-w-xs text-base font-medium text-zinc-500 dark:text-zinc-400">
              Auto-fill applications across all major job boards. Land your
              dream job, faster.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <h5 className="text-sm font-bold tracking-widest text-zinc-900 uppercase dark:text-zinc-100">
              Product
            </h5>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
              <li>
                <Link href="/#features" className="transition-colors hover:text-primary">Features</Link>
              </li>
              <li>
                <Link href="/#process" className="transition-colors hover:text-primary">How it Works</Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-primary">Pricing</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h5 className="text-sm font-bold tracking-widest text-zinc-900 uppercase dark:text-zinc-100">
              Legal
            </h5>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-primary">Terms of Service</Link>
                </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-8 border-t border-zinc-100 pt-10 md:flex-row md:items-center md:justify-between dark:border-zinc-900">
          <p className="text-sm font-medium text-zinc-400">
            © 2026 OpenRole. All rights reserved.
          </p>
          <p className="text-sm font-medium text-zinc-400 italic">
            Made by job seekers for job seekers
          </p>
        </div>
      </div>
    </footer>
  )
}

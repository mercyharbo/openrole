"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

// Custom Premium Icons (Inline SVGs for reliability)
const Icons = {
  AI: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      <path d="M12 12v10" />
    </svg>
  ),
  Success: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Error: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Automation: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </svg>
  ),
  Shield: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      {/* Header */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border/10 bg-background/40 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="group flex cursor-pointer items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30 transition-all group-hover:scale-105 group-hover:rotate-3">
              <Icons.AI className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              x
              <span className="text-3xl leading-none text-primary italic">
                jobs
              </span>
            </span>
          </div>
          <div className="hidden items-center gap-10 text-xs font-semibold tracking-wide text-muted-foreground/80 uppercase lg:flex">
            <Link href="#how" className="transition-colors hover:text-primary">
              Process
            </Link>
            <Link
              href="#features"
              className="transition-colors hover:text-primary"
            >
              Technology
            </Link>
            <Link
              href="#waitlist"
              className="transition-colors hover:text-primary"
            >
              Join Waitlist
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hidden text-xs font-bold tracking-widest uppercase sm:inline-flex"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button className="rounded-full bg-primary px-8 text-xs font-bold tracking-widest text-white uppercase shadow-xl shadow-primary/20 hover:bg-primary/90">
              Waitlist
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Luxury Hero Comparison */}
        <section className="px-6 pt-32 pb-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Text Content */}
            <div className="relative z-10 text-left">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-black tracking-widest text-primary uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Introducing the future of hiring
              </div>
              <h1 className="mb-8 text-6xl leading-[0.95] font-black tracking-tight md:text-8xl">
                Hired, <br />
                <span className="text-primary italic">not hunted.</span>
              </h1>
              <p className="mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Automate your entire career search. From sourcing roles to
                tailoring resumes and auto-applying—let our AI handle the
                rejection while you handle the offers.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="relative w-full sm:w-80">
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="h-16 w-full rounded-2xl border border-border bg-white pr-4 pl-6 text-sm font-medium shadow-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:bg-zinc-900"
                  />
                </div>
                <Button className="group h-16 w-full rounded-2xl bg-primary px-10 text-base font-bold text-white shadow-2xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95 sm:w-auto">
                  Join Waitlist{" "}
                  <Icons.ArrowRight className="ml-2 size-5 transition-all group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Right Column: Comparison Visuals */}
            <div className="relative flex flex-col gap-6">
              {/* Manual Path (Sad) */}
              <div className="group relative overflow-hidden rounded-3xl border border-red-500/10 grayscale transition-all duration-700 hover:border-red-500/30 hover:grayscale-0">
                <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 text-xs font-black tracking-widest text-white uppercase shadow-lg">
                  <Icons.Error className="size-3" /> Manual Search
                </div>
                <div className="relative h-64 w-full">
                  <Image
                    src="/sad-jobless.png"
                    alt="Sad job seeker"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="mb-1 text-xs font-bold tracking-widest text-white/60 uppercase">
                    Status: Stuck
                  </p>
                  <p className="text-lg font-bold text-white">
                    400+ Applications. 0 Replies.
                  </p>
                </div>
              </div>

              {/* xjobs Path (Happy) */}
              <div className="group relative overflow-hidden rounded-3xl border-2 border-primary shadow-2xl shadow-primary/20 transition-all duration-700 hover:scale-105">
                <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-primary/80 to-transparent" />
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black tracking-widest text-primary uppercase shadow-xl">
                  <Icons.AI className="size-3" /> xjobs Powered
                </div>
                <div className="absolute top-6 right-6 z-20 animate-pulse rounded-full bg-primary px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase shadow-xl">
                  Verified Hire
                </div>
                <div className="relative h-72 w-full">
                  <Image
                    src="/happy-job.png"
                    alt="Happy job seeker"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <p className="mb-1 text-xs font-bold tracking-widest text-white/80 uppercase">
                    Status: Thriving
                  </p>
                  <p className="text-xl leading-tight font-black italic">
                    "xjobs applied for 50 roles while I was sleeping. I got 3
                    interviews by morning."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Feature Bar */}
        <section
          id="features"
          className="border-y border-border/10 bg-zinc-50 py-24 dark:bg-zinc-950/50"
        >
          <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-3">
            <FeatureItem
              icon={<Icons.Automation />}
              title="Tailored Precision"
              text="Our AI re-engineers your resume for every single job post, ensuring 100% ATS compatibility."
            />
            <FeatureItem
              icon={<Icons.Shield />}
              title="Seamless Automation"
              text="Connect your LinkedIn, Indeed, and more. Our engine executes applications 24/7."
            />
            <FeatureItem
              icon={<Icons.Success />}
              title="Verified Success"
              text="Smart interview tracking and salary negotiation insights powered by global job market data."
            />
          </div>
        </section>

        {/* Join CTA */}
        <section id="waitlist" className="px-6 py-32 text-center">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-primary p-12 shadow-2xl shadow-primary/30 md:p-20">
            <div className="absolute -top-1/4 -right-1/4 h-full w-2/3 rotate-45 rounded-full bg-white/10 blur-3xl" />
            <h2 className="mb-8 text-4xl font-black tracking-tighter text-white italic md:text-6xl">
              Ready to quit the search?
            </h2>
            <p className="mx-auto mb-12 max-w-sm text-lg font-medium text-white/80">
              Limited spots available for our private beta. Join 2,000+
              professionals already in line.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="h-16 w-full rounded-2xl bg-white px-12 text-sm font-black tracking-widest text-primary uppercase transition-all hover:bg-zinc-100 sm:w-auto">
                Secure My Spot
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-border/10 px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 md:flex-row">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Icons.AI className="size-6 text-primary" />
              <span className="text-xl font-bold tracking-tighter italic">
                xjobs
              </span>
            </div>
            <p className="max-w-xs text-sm font-medium text-muted-foreground">
              The intelligent infrastructure for your professional future.
            </p>
          </div>
          <div className="flex gap-12 text-xs font-black tracking-widest text-muted-foreground/60 uppercase">
            <Link href="#" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Contact
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Twitter
            </Link>
          </div>
          <div className="text-xs font-medium text-muted-foreground/40 italic">
            © 2026 xjobs corp.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="group flex flex-col gap-6">
      <div className="flex size-14 scale-100 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<any>, {
              className: "size-6",
            })
          : icon}
      </div>
      <div>
        <h3 className="mb-3 text-lg font-bold tracking-tight italic">
          {title}
        </h3>
        <p className="text-sm leading-relaxed font-medium text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  )
}

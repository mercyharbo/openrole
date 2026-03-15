"use client"

import React from "react"
import { Hero } from "@/components/landing/hero"
import { BrandBar } from "@/components/landing/brand-bar"
import { Features } from "@/components/landing/features"
import { Process } from "@/components/landing/process"
import { Pricing } from "@/components/landing/pricing"
import { CTA } from "@/components/landing/cta"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white font-sans text-zinc-950 selection:bg-primary/10 selection:text-primary dark:bg-zinc-950 dark:text-zinc-50">
      <main>
        <Hero />
        <BrandBar />
        <Features />
        <Process />
        <Pricing />
        <CTA />
      </main>
    </div>
  )
}

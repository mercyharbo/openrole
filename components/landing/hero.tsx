import { Button } from "@/components/ui/button"
import HeroImage from "@/public/xjobs-hero-human-wide.png"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Icons } from "./icons"

import Avatar1 from "@/public/avatar-1.png"
import Avatar2 from "@/public/avatar-2.png"
import Avatar3 from "@/public/avatar-3.png"
import Avatar4 from "@/public/avatar-4.png"

export const Hero = () => {
  return (
    <section className="px-6 pt-32 pb-20 lg:pt-44 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative z-10 flex flex-col items-start gap-5 text-left">
            <h1 className="max-w-2xl text-5xl leading-tight font-bold md:text-6xl lg:text-6xl">
              Stop filling forms. <br />
              <span className="text-primary">Start landing jobs.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed font-medium text-zinc-500">
              OpenRole auto-fills job applications across Greenhouse, Lever,
              Workday, and more. One-click to apply everywhere.
            </p>

            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button className="h-12 w-full rounded-full bg-primary px-10 font-semibold text-primary-foreground shadow-2xl transition-all hover:bg-primary/90 sm:w-auto">
                  Get Started Free &rarr;
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full px-10 font-semibold text-zinc-900 sm:w-auto dark:text-zinc-100"
                >
                  Login
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="relative size-10 overflow-hidden rounded-full border-2 border-white bg-zinc-100 dark:border-zinc-950 dark:bg-zinc-800">
                  <Image src={Avatar1} alt="Avatar" fill className="object-cover" />
                </div>
                <div className="relative size-10 overflow-hidden rounded-full border-2 border-white bg-zinc-100 dark:border-zinc-950 dark:bg-zinc-800">
                  <Image src={Avatar2} alt="Avatar" fill className="object-cover" />
                </div>
                <div className="relative size-10 overflow-hidden rounded-full border-2 border-white bg-zinc-100 dark:border-zinc-950 dark:bg-zinc-800">
                  <Image src={Avatar3} alt="Avatar" fill className="object-cover" />
                </div>
                <div className="relative size-10 overflow-hidden rounded-full border-2 border-white bg-zinc-100 dark:border-zinc-950 dark:bg-zinc-800">
                  <Image src={Avatar4} alt="Avatar" fill className="object-cover" />
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-500">
                Trusted by{" "}
                <span className="font-bold text-zinc-950 dark:text-zinc-50">
                  50+
                </span>{" "}
                professionals
              </p>
            </div>
          </div>

          <div className="relative aspect-square w-full sm:aspect-video lg:aspect-square">
            <div className="absolute inset-0 rounded-3xl bg-zinc-100 p-2 dark:bg-zinc-900/50">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white dark:border-zinc-800">
                <Image
                  src={HeroImage}
                  alt="Professional successful using OpenRole"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Floating Status Card */}
            <div className="absolute -right-4 bottom-12 rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-2xl backdrop-blur-md sm:-right-8 dark:border-zinc-800 dark:bg-zinc-900/90">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-500/10">
                  <Icons.Success className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-zinc-500 uppercase">
                    Status: Active
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Applied to Stripe (Greenhouse)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

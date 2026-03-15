import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

export const CTA = () => {
  return (
    <section className="bg-zinc-950 px-6 py-24 text-white dark:bg-zinc-900/20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <h2 className="text-4xl leading-tight font-bold md:text-5xl">
          Ready to land your <br />
          <span className="text-blue-400 italic">dream job?</span>
        </h2>
        <p className="max-w-xl text-lg font-medium text-zinc-300">
          Reimagine your job search with OpenRole. Our intelligent automation
          navigates the complexities of Greenhouse, Lever, and Workday.
        </p>
        <Link href="/register">
          <Button className="h-12 rounded-full bg-primary px-12 font-bold text-primary-foreground shadow-2xl transition-all hover:scale-105 hover:bg-primary/90 active:scale-95">
            Join 500+ users today &rarr;
          </Button>
        </Link>
      </div>
    </section>
  )
}

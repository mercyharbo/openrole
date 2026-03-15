import React from "react"
import { Icons } from "./icons"

const features = [
  {
    icon: <Icons.Lightning />,
    title: "One-Click Auto-Fill",
    desc: "Instantly fill out entire job applications with your saved profile. No more copy-pasting.",
  },
  {
    icon: <Icons.Focus />,
    title: "Smart Field Detection",
    desc: "AI detects form fields across different job boards and fills them accurately every time.",
  },
  {
    icon: <Icons.Document />,
    title: "AI Resume Builder",
    desc: "Generate tailored resumes optimized for each job description automatically.",
  },
  {
    icon: <Icons.Mail />,
    title: "Cover Letter Generator",
    desc: "Create personalized cover letters that match your experience to job requirements.",
  },
  {
    icon: <Icons.Chart />,
    title: "Application Tracking",
    desc: "Track all your applications in one dashboard. Never lose track of where you applied.",
  },
  {
    icon: <Icons.Lock />,
    title: "Secure & Private",
    desc: "Your data is encrypted and never shared. You control what information is used.",
  },
]

export const Features = () => {
  return (
    <section id="features" className="px-6 py-24 lg:py-40">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 text-center lg:text-left">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            FEATURES
          </span>
          <h2 className="text-5xl font-bold md:text-6xl">
            Everything you need to <br />
            apply faster
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center gap-6 rounded-3xl border border-zinc-100 bg-white p-10 text-center transition-all hover:border-primary/20 hover:shadow-2xl lg:items-start lg:text-left dark:border-zinc-800 dark:bg-zinc-900/30"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                {React.cloneElement(
                  feature.icon as React.ReactElement<{ className?: string }>,
                  { className: "size-6" }
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

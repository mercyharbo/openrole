import ProcessImage from "@/public/xjobs-process-man.png"
import Image from "next/image"
import React from "react"

const steps = [
  {
    step: "1",
    title: "Create Your Profile",
    desc: "Upload your resume or fill out your profile once. We'll store all your information securely.",
  },
  {
    step: "2",
    title: "Install Extension",
    desc: "Add the OpenRole Chrome extension and connect it to your account in one click.",
  },
  {
    step: "3",
    title: "Apply Anywhere",
    desc: "Visit any job posting and click 'Auto-Fill'. We handle the rest.",
  },
]

export const Process = () => {
  return (
    <section
      id="process"
      className="bg-zinc-50 px-6 py-24 lg:py-40 dark:bg-zinc-900/50"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            HOW IT WORKS
          </span>
          <h2 className="text-5xl font-bold md:text-6xl">
            Apply to jobs in 3 steps
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center gap-8 text-center"
            >
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-primary text-xl font-bold text-primary">
                {item.step}
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-2xl font-bold">{item.title}</h4>
                <p className="leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="shadow-3xl relative mx-auto mt-20 aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-white dark:border-zinc-800">
          <Image
            src={ProcessImage}
            alt="Getting interviews with OpenRole"
            fill
            className="object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  )
}

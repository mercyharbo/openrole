"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import NextImage from "next/image"
import { ResumeCard } from "./components/resume-card"
import { SmartAssistCard } from "./components/smart-assist-card"

const GENERATORS = [
  {
    title: "Resume Generator",
    description: "Generate a resume using your profile or a custom prompt.",
  },
  {
    title: "Cover Letter Generator",
    description: "Generate a tailored cover letter from a job description.",
  },
  {
    title: "About Me Generator",
    description: "Create a compelling personal summary for your profile.",
  },
]

const RESUMES = [
  {
    id: "1",
    name: "Johnbull Updated 1",
    date: "Jan 12, 2026",
    time: "12:05 PM",
    preview: "/resume-previews/1.png", // Placeholder
  },
]

export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <Card className="relative overflow-hidden">
        <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div className="z-10 flex flex-col gap-3 md:max-w-[70%] lg:max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Smart Assistance
            </h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Use AI to generate resumes, cover letters, and bio summaries in
              seconds.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-8 flex size-40 shrink-0 md:right-10 md:-bottom-20 md:size-56">
            <NextImage
              src="/bot.png"
              alt="AI Bot Assistant"
              width={256}
              height={256}
              className="object-contain"
              priority
            />
          </div>
        </CardContent>
      </Card>

      {/* Smart Assist Section */}
      <Card>
        <CardHeader className="px-6">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            Smart Assist
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GENERATORS.map((gen) => (
              <SmartAssistCard key={gen.title} {...gen} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Resume Section */}
      <Card>
        <CardHeader className="px-6">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            All Resume
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            {RESUMES.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

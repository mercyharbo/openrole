"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import NextImage from "next/image"
import { ResumeCard } from "./components/resume-card"
import { SmartAssistCard } from "./components/smart-assist-card"
import { useResumes } from "@/hooks/use-resumes"

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

export default function ToolsPage() {
  const { resumes, deleteResume, isLoaded } = useResumes()

  return (
    <div className="flex flex-col gap-8 pb-10">
      <Card className="relative overflow-hidden">
        <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div className="z-10 flex flex-col gap-3 md:max-w-[70%] lg:max-w-md">
            <h1 className="text-2xl font-medium text-zinc-950 dark:text-zinc-50">
              Smart Assistance
            </h1>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
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
          <CardTitle className="text-base font-medium text-zinc-950 dark:text-zinc-50">
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
          <CardTitle className="text-base font-medium text-zinc-950 dark:text-zinc-50">
            All Resume
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-8">
          {!isLoaded ? (
            <div className="flex h-32 items-center justify-center text-zinc-500">
              Loading resumes...
            </div>
          ) : resumes.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4">
              {resumes.map((resume) => (
                <ResumeCard 
                  key={resume.id} 
                  resume={resume} 
                  onDelete={deleteResume}
                  isSaved={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                No resumes saved yet. Use the generator to create one!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

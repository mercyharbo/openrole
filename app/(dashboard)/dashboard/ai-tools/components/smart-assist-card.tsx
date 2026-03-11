"use client"

import { useState } from "react"
import { AboutMeGeneratorSheet } from "./about-me-generator-sheet"
import { CoverLetterGeneratorSheet } from "./cover-letter-generator-sheet"
import { ResumeGeneratorSheet } from "./resume-generator-sheet"

interface SmartAssistCardProps {
  title: string
  description: string
}

/**
 * SmartAssistCard component for generator tools.
 * Featuring a dashed border, hover effects, and a slide-out generator sheet.
 */
export function SmartAssistCard({ title, description }: SmartAssistCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Map titles to their respective sheets
  const renderSheet = () => {
    const t = title.toLowerCase()
    if (t.includes("resume")) {
      return <ResumeGeneratorSheet isOpen={isOpen} onOpenChange={setIsOpen} />
    }
    if (t.includes("cover letter")) {
      return (
        <CoverLetterGeneratorSheet isOpen={isOpen} onOpenChange={setIsOpen} />
      )
    }
    if (t.includes("about me")) {
      return <AboutMeGeneratorSheet isOpen={isOpen} onOpenChange={setIsOpen} />
    }
    return null
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center transition-all hover:border-primary/50 hover:bg-gray-50/50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-primary/50 dark:hover:bg-zinc-900/40"
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {renderSheet()}
    </>
  )
}

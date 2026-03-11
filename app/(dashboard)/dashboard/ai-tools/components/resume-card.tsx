"use client"

import { Separator } from "@/components/ui/separator"
import { FileText, MoreHorizontal } from "lucide-react"

interface ResumeCardProps {
  resume: {
    id: string
    name: string
    date: string
    time: string
    preview?: string
  }
}

/**
 * ResumeCard component for displaying generated resumes.
 * Includes PDF badge, name, preview placeholder, and generation date.
 */
export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-gray-100 bg-white transition-all dark:border-zinc-800 dark:bg-zinc-900/40">
      {/* Resume Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
            <FileText className="size-5 text-gray-400 dark:text-gray-500" />
            <div className="absolute -right-1 -bottom-1 flex h-3.5 w-5 items-center justify-center rounded-sm bg-gray-200 text-[7px] font-bold text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
              PDF
            </div>
          </div>
          <span className="text-[15px] font-medium text-gray-900 dark:text-gray-100">
            {resume.name}
          </span>
        </div>
        <button className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-zinc-800">
          <MoreHorizontal className="size-5" />
        </button>
      </div>

      {/* Resume Preview Placeholder */}
      <div className="h-[200px] w-full bg-gray-100/60 dark:bg-zinc-800/60">
        {/* Actual image would go here:
        {resume.preview && (
          <NextImage src={resume.preview} alt={resume.name} fill className="object-cover" />
        )}
        */}
      </div>

      {/* Resume Footer */}
      <Separator />
      <div className="flex items-center justify-between px-5 py-4 text-xs font-medium text-gray-500 dark:text-gray-400">
        <span>Generated on</span>
        <span>
          {resume.date} • {resume.time}
        </span>
      </div>
    </div>
  )
}

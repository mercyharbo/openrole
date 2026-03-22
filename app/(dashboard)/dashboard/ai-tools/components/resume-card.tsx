"use client"

import { Separator } from "@/components/ui/separator"
import { FileText, MoreHorizontal, Download, Trash2, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Generation } from "@/lib/types/generation"

interface ResumeCardProps {
  resume: Generation
  onDelete?: (id: string) => void
  onSave?: (resume: Generation) => void
  isSaved?: boolean
}

/**
 * ResumeCard component for displaying generated resumes.
 * Includes PDF badge, name, preview placeholder, and generation date.
 */
export function ResumeCard({ resume, onDelete, onSave, isSaved }: ResumeCardProps) {
  const handleDownload = async () => {
    if (!resume.file_url) return
    
    try {
      const response = await fetch(resume.file_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      const format = resume.metadata?.format || "pdf"
      const name = resume.metadata?.name || `Resume_${resume.id.slice(0, 5)}`
      link.download = `${name}.${format}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
      // Fallback: just open in new tab
      window.open(resume.file_url, "_blank")
    }
  }

  const createdAt = new Date(resume.created_at)
  const dateStr = createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const timeStr = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-gray-100 bg-white transition-all dark:border-zinc-800 dark:bg-zinc-900/40">
      {/* Resume Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
            <FileText className="size-5 text-gray-400 dark:text-gray-500" />
            <div className="absolute -right-1 -bottom-1 flex h-3.5 px-1.5 items-center justify-center rounded-sm bg-gray-200 text-[7px] font-bold text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
              {(resume.metadata?.format || "pdf").toUpperCase()}
            </div>
          </div>
          <span className="text-[15px] font-medium text-gray-900 dark:text-gray-100">
            {resume.metadata?.name || `Resume (${(resume.metadata?.format || "pdf").toUpperCase()})`}
          </span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-zinc-800">
              <MoreHorizontal className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="mr-2 size-4 text-gray-500" />
              <span>Download PDF</span>
            </DropdownMenuItem>
            
            {onSave && !isSaved && (
              <DropdownMenuItem onClick={() => onSave(resume)}>
                <Plus className="mr-2 size-4 text-gray-500" />
                <span>Save to Dashboard</span>
              </DropdownMenuItem>
            )}
            
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  variant="destructive" 
                  onClick={() => onDelete(resume.id)}
                >
                  <Trash2 className="mr-2 size-4 text-destructive" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Resume Preview Placeholder */}
      <div className="group/preview relative h-[200px] w-full bg-gray-100/60 dark:bg-zinc-800/60">
        {resume.file_url && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/preview:opacity-100">
            <a
              href={resume.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-zinc-800/90 dark:text-white dark:hover:bg-zinc-800"
            >
              View Document
            </a>
          </div>
        )}
      </div>

      {/* Resume Footer */}
      <Separator />
      <div className="flex items-center justify-between px-5 py-4 text-xs font-medium text-gray-500 dark:text-gray-400">
        <span>Generated on</span>
        <span>
          {dateStr} • {timeStr}
        </span>
      </div>
    </div>
  )
}

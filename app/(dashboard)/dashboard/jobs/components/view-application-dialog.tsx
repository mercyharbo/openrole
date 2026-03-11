"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText } from "lucide-react"

interface ViewApplicationDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  resumeName?: string
}

export function ViewApplicationDialog({
  isOpen,
  onOpenChange,
  resumeName = "Johnbull Updated 2",
}: ViewApplicationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] gap-6 rounded-2xl border-none p-6 dark:bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Application
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900">
            <div className="relative flex size-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
              <FileText className="size-6 text-gray-400 dark:text-gray-500" />
              <div className="absolute -right-1 -bottom-1 flex h-4 w-6 items-center justify-center rounded-sm bg-gray-200 text-[8px] font-bold text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
                DOC
              </div>
            </div>
            <span className="text-base font-medium text-gray-900 dark:text-gray-100">
              {resumeName}
            </span>
          </div>

          <p className="px-1 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
            Click the doc to preview the AI-generated resume used for this
            application.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

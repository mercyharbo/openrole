"use client"

import { useState } from "react"
import { Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { useApi } from "@/hooks/use-api"
import { toast } from "react-toastify"
import { useGenerations } from "@/hooks/use-generations"

interface CoverLetterGeneratorSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * CoverLetterGeneratorSheet component.
 * Allows users to paste a job description and generate a tailored cover letter.
 */
export function CoverLetterGeneratorSheet({
  isOpen,
  onOpenChange,
}: CoverLetterGeneratorSheetProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const { post } = useApi()
  const { refreshGenerations } = useGenerations('cover_letter')

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please provide a job description")
      return
    }

    setIsLoading(true)
    setApiError(null)
    try {
      const { data, error } = await post("applicants/generate/cover-letter", {
        job_description: jobDescription,
      })

      if (error) {
        throw new Error(error)
      }

      // Unwrap envelope if it exists
      const content = data.data?.content || data.content
      setGeneratedContent(content)
      refreshGenerations?.()
      toast.success("Cover letter generated successfully!")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error generating cover letter. Please try again."
      console.error(error)
      setApiError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (!generatedContent) return
    navigator.clipboard.writeText(generatedContent)
    setIsCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="scrollbar-hide overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b border-gray-100 dark:border-zinc-800">
          <SheetTitle className="text-lg font-semibold">
            Generate Cover Letter
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 py-6">
          {/* Form Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Description
              </label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="min-h-[160px] resize-none border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>

            {apiError && (
              <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {apiError}
              </div>
            )}

            <Button
              className="h-11 w-full text-white"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate cover letter"
              )}
            </Button>
          </div>

          <Separator />

          {/* Response Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">
              Response
            </h3>
            <div className="rounded-xl border border-gray-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                {generatedContent || "Your response will appear here..."}
              </p>
            </div>
            {generatedContent && (
              <Button
                variant="outline"
                className="h-11 w-full border-gray-200 font-semibold text-gray-600 dark:border-zinc-800 dark:text-gray-400"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy response
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

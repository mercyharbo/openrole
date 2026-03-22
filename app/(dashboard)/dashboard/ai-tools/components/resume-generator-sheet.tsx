"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { ResumeCard } from "./resume-card"
import { Generation } from "@/lib/types/generation"

interface ResumeGeneratorSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ResumeGeneratorSheet({
  isOpen,
  onOpenChange,
}: ResumeGeneratorSheetProps) {
  const [format, setFormat] = useState("pdf")
  const [template, setTemplate] = useState("1")
  const [modifications, setModifications] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedResume, setGeneratedResume] = useState<Generation | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const { post } = useApi()
  const { refreshGenerations, generations: resumes } = useGenerations('resume')

  const handleGenerateResume = async () => {
    setIsLoading(true)
    setApiError(null)
    try {
      const { data, error } = await post("applicants/generate/resume", {
        format,
        template,
        modifications,
        job_description: jobDescription,
      })

      if (error) {
        throw new Error(error)
      }

      // Unwrap envelope if it exists
      const resumeData = data.data || data
      
      setGeneratedResume({
        id: resumeData.id || Math.random().toString(36).substr(2, 9),
        type: 'resume',
        content: resumeData.content || "",
        file_url: resumeData.file_url,
        metadata: {
          format: resumeData.format,
          name: `Resume (${resumeData.format.toUpperCase()})`,
        },
        created_at: new Date().toISOString(),
      })
      
      refreshGenerations?.()
      toast.success("Resume generated successfully!")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error generating resume. Please try again."
      console.error(error)
      setApiError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="scrollbar-hide overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b border-gray-100 dark:border-zinc-800">
          <SheetTitle className="text-lg font-semibold">
            Resume Generator
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 py-6">
          {/* Form Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Output Format
              </label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger
                  size="lg"
                  className="w-full border-gray-200 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="doc">Word (DOCX)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Template
              </label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger
                  size="lg"
                  className="w-full border-gray-200 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Classic (Two columns)</SelectItem>
                  <SelectItem value="2">Modern (Single column)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Modification (Optional)
              </label>
              <Textarea
                value={modifications}
                onChange={(e) => setModifications(e.target.value)}
                placeholder="E.g, change title to Senior Engineer, highlight Python and AWS, remove internship experience, make summary focus on Fintech..."
                className="min-h-[120px] resize-none border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Optimize for job (Optional)
              </label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description or link here to optimize your resume for a specific role..."
                className="min-h-[120px] resize-none border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>

            {apiError && (
              <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {apiError}
              </div>
            )}

            <Button
              className="h-11 w-full text-white"
              onClick={handleGenerateResume}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate resume"
              )}
            </Button>
          </div>

          <Separator />

          {/* Response Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">
              Response
            </h3>
            {generatedResume ? (
              <ResumeCard 
                resume={generatedResume} 
                isSaved={true}
              />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 dark:border-zinc-800">
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Generated resumes will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

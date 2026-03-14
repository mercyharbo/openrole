"use client"

import { useState } from "react"
import { Loader2, Copy, Check } from "lucide-react"
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
import { useApi } from "@/hooks/use-api"
import { toast } from "react-toastify"

interface AboutMeGeneratorSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * AboutMeGeneratorSheet component.
 * Allows users to provide instructions and generate a personal bio/summary.
 */
export function AboutMeGeneratorSheet({
  isOpen,
  onOpenChange,
}: AboutMeGeneratorSheetProps) {
  const [tone, setTone] = useState("professional")
  const [length, setLength] = useState("medium")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const { post } = useApi()

  const handleGenerate = async () => {
    setIsLoading(true)
    setApiError(null)
    try {
      const { data, error } = await post("applicants/generate/about-me", {
        tone,
        length,
      })

      if (error) {
        throw new Error(error)
      }

      // Unwrap envelope if it exists
      const content = data.data?.content || data.content
      setGeneratedContent(content)
      toast.success("About me generated successfully!")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error generating about me. Please try again."
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
            About Me Generator
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 py-6">
          {/* Form Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tone
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger
                  size="lg"
                  className="w-full border-gray-200 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Length
              </label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger
                  size="lg"
                  className="w-full border-gray-200 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                </SelectContent>
              </Select>
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
                "Generate"
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

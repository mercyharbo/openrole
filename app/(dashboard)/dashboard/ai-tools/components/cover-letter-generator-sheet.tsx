"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

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
                placeholder="Paste the job description here..."
                className="min-h-[160px] resize-none border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>

            <Button className="h-11 w-full text-white">
              Generate cover letter
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
                {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
              </p>
            </div>
            <Button
              variant="outline"
              className="h-11 w-full border-gray-200 font-semibold text-gray-600 dark:border-zinc-800 dark:text-gray-400"
            >
              Copy response
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

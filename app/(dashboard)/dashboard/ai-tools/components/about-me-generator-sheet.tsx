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
                Instruction (Optional)
              </label>
              <Textarea
                placeholder="Write your instruction here..."
                className="min-h-[160px] resize-none border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>

            <Button className="h-11 w-full text-white">Generate</Button>
          </div>

          <Separator />

          {/* Response Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">
              Response
            </h3>
            <div className="rounded-xl border border-gray-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                Your response will appear here...
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

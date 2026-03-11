"use client"

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
import { ResumeCard } from "./resume-card"

interface ResumeGeneratorSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * ResumeGeneratorSheet component.
 * Allows users to configure and generate an AI resume.
 * Displays the generated resume in the response section.
 */
export function ResumeGeneratorSheet({
  isOpen,
  onOpenChange,
}: ResumeGeneratorSheetProps) {
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
              <Select defaultValue="pdf">
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
              <Select defaultValue="classic">
                <SelectTrigger
                  size="lg"
                  className="w-full border-gray-200 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classic (Two columns)</SelectItem>
                  <SelectItem value="modern">Modern (Single column)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Modification (Optional)
              </label>
              <Textarea
                placeholder="E.g, change title to Senior Engineer, highlight Python and AWS, remove internship experience, make summary focus on Fintech..."
                className="min-h-[120px] resize-none border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>

            <Button className="h-11 w-full text-white">Generate resume</Button>
          </div>

          <Separator />

          {/* Response Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">
              Response
            </h3>
            <ResumeCard
              resume={{
                id: "1",
                name: "Johnbull Updated 1",
                date: "Jan 12, 2026",
                time: "12:05 PM",
                preview: "/resume-previews/1.png",
              }}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

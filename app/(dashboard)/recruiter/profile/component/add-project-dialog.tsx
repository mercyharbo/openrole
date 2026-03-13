"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useProfileStore } from "@/lib/store/profile-store"
import { cn } from "@/lib/utils"
import { Image as ImageIcon, X } from "lucide-react"
import NextImage from "next/image"

const TOOLS_OPTIONS = [
  "Figma",
  "Sketch",
  "Framer",
  "Adobe XD",
  "Adobe Illustrator",
  "Blender",
  "Photoshop",
  "Miro",
]

export function AddProjectDialog() {
  const {
    isProjectsDialogOpen,
    setProjectsDialogOpen,
    projectForm,
    setProjectForm,
    resetProjectForm,
    addProject,
  } = useProfileStore()

  const handleAddTool = (tool: string) => {
    if (!projectForm.tools.includes(tool)) {
      setProjectForm({
        tools: [...projectForm.tools, tool],
      })
    }
  }

  const handleRemoveTool = (tool: string) => {
    setProjectForm({
      tools: projectForm.tools.filter((t) => t !== tool),
    })
  }

  const handleSave = () => {
    if (!projectForm.title) return

    addProject({
      title: projectForm.title,
      description: projectForm.description,
      link: projectForm.link,
      skills: projectForm.skills,
      tools: projectForm.tools,
      image: projectForm.image,
    })

    setProjectsDialogOpen(false)
    resetProjectForm()
  }

  return (
    <Dialog open={isProjectsDialogOpen} onOpenChange={setProjectsDialogOpen}>
      <DialogContent className="flex h-[90dvh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Projects
          </DialogTitle>
        </DialogHeader>

        <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto bg-white p-4 [-ms-overflow-style:none] [scrollbar-width:none] dark:bg-zinc-950 [&::-webkit-scrollbar]:hidden">
          {/* Cover Photo Upload Section */}
          <div className="rounded-xl bg-gray-50/50 p-6 dark:bg-muted/50">
            <div className="flex items-center gap-6">
              <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-gray-500">
                {projectForm.image ? (
                  <NextImage
                    src={projectForm.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ImageIcon className="size-10" />
                )}
              </div>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="h-10 border-gray-300 bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-300"
                >
                  Upload cover photo
                </Button>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    At least 800 x 800 px recommended.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    JPG or PNG is allowed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="space-y-6 rounded-xl bg-gray-50/50 p-6 dark:bg-muted/50">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Project Name
              </label>
              <Input
                placeholder="Enter project name"
                className="h-11 border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Tools
              </label>
              <Select onValueChange={handleAddTool}>
                <SelectTrigger
                  size="lg"
                  className="w-full border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select tools" />
                </SelectTrigger>
                <SelectContent>
                  {TOOLS_OPTIONS.map((tool) => (
                    <SelectItem key={tool} value={tool}>
                      {tool}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2 pt-2">
                {projectForm.tools.map((tool) => (
                  <div
                    key={tool}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-100 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-300"
                  >
                    {tool}
                    <button
                      onClick={() => handleRemoveTool(tool)}
                      className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Description
              </label>
              <Textarea
                placeholder="Write short brief about the project"
                className="min-h-[120px] resize-none border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({ description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Link Section */}
          <div className="rounded-xl bg-gray-50/50 p-6 dark:bg-muted/50">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Link
              </label>
              <Input
                placeholder="www.example.com"
                className="h-11 border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
                value={projectForm.link}
                onChange={(e) => setProjectForm({ link: e.target.value })}
              />
            </div>
          </div>

          {/* Additional Images Section */}
          <div className="space-y-4 rounded-xl bg-gray-50/50 p-6 dark:bg-muted/50">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Additional Images
            </label>
            <div className="flex min-h-[100px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Upload video here, or click to browse
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
          <Button
            variant="outline"
            className="h-11 shrink-0 border-gray-200 px-10 dark:border-zinc-800 dark:text-gray-300"
            onClick={() => {
              setProjectsDialogOpen(false)
              resetProjectForm()
            }}
          >
            Cancel
          </Button>
          <Button
            className={cn(
              "h-11 shrink-0 px-14 transition-all",
              projectForm.title
                ? "bg-[#6B7281] text-white hover:bg-[#4B5563]"
                : "cursor-not-allowed border-none bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-gray-500"
            )}
            onClick={handleSave}
            disabled={!projectForm.title}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

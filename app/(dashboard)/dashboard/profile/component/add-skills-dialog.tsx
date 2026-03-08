"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"

import { useProfileStore } from "@/lib/store/profile-store"

const SKILLS_OPTIONS = [
  "Prototyping",
  "User Interface",
  "Ux Research",
  "User Experience",
  "Visual Design",
  "Interaction Design",
  "Wireframing",
]

const TOOLS_OPTIONS = [
  "Figma",
  "Sketch",
  "Framer",
  "Adobe XD",
  "InVision",
  "Miro",
]

export function AddSkillsDialog() {
  const {
    isSkillsDialogOpen,
    setSkillsDialogOpen,
    skillsForm,
    setSkillsForm,
    resetSkillsForm,
  } = useProfileStore()

  const handleAddSkill = (skill: string) => {
    if (!skillsForm.selectedSkills.includes(skill)) {
      setSkillsForm({
        selectedSkills: [...skillsForm.selectedSkills, skill],
      })
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkillsForm({
      selectedSkills: skillsForm.selectedSkills.filter((s) => s !== skill),
    })
  }

  const handleAddTool = (tool: string) => {
    if (!skillsForm.selectedTools.includes(tool)) {
      setSkillsForm({
        selectedTools: [...skillsForm.selectedTools, tool],
      })
    }
  }

  const handleRemoveTool = (tool: string) => {
    setSkillsForm({
      selectedTools: skillsForm.selectedTools.filter((t) => t !== tool),
    })
  }

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Skills saved:", skillsForm)
    setSkillsDialogOpen(false)
    resetSkillsForm()
  }

  return (
    <Dialog open={isSkillsDialogOpen} onOpenChange={setSkillsDialogOpen}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-100 px-6 py-4">
          <DialogTitle className="">About</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 bg-white p-6">
          {/* Skills Section */}
          <div className="space-y-3">
            <label className="block text-sm text-gray-600">Skills</label>
            <Select onValueChange={handleAddSkill}>
              <SelectTrigger
                size="default"
                className="h-10 w-full border-gray-200 transition-all focus:ring-primary/20 md:h-11"
              >
                <SelectValue placeholder="Select skills" />
              </SelectTrigger>
              <SelectContent>
                {SKILLS_OPTIONS.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 pt-1">
              {skillsForm.selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-3">
            <label className="block text-sm text-gray-600">Tools</label>
            <Select onValueChange={handleAddTool}>
              <SelectTrigger
                size="default"
                className="h-10 w-full border-gray-200 transition-all focus:ring-primary/20 md:h-11"
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

            <div className="flex flex-wrap gap-2 pt-1">
              {skillsForm.selectedTools.map((tool) => (
                <div
                  key={tool}
                  className="inline-flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                >
                  {tool}
                  <button
                    onClick={() => handleRemoveTool(tool)}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row">
          <Button
            variant="outline"
            className="px-10 transition-colors"
            onClick={() => {
              setSkillsDialogOpen(false)
              resetSkillsForm()
            }}
          >
            Cancel
          </Button>
          <Button
            className="border-none bg-[#6B7281] px-10 text-white transition-all hover:bg-[#4B5563]"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

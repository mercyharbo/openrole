"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronUp, Plus, X } from "lucide-react"

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Self-employed",
  "Freelance",
  "Contract",
  "Internship",
  "Apprenticeship",
  "Seasonal",
]

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

export function AddExperienceDialog() {
  const {
    isExperienceDialogOpen,
    setExperienceDialogOpen,
    experiences,
    addExperience,
    updateExperience,
    toggleExperienceCollapse,
    resetExperiences,
  } = useProfileStore()

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Experiences saved:", experiences)
    setExperienceDialogOpen(false)
    resetExperiences()
  }

  const isFormValid =
    experiences.length > 0 &&
    experiences.every(
      (exp) =>
        exp.role &&
        exp.company &&
        exp.employmentType &&
        exp.startDate &&
        (exp.isCurrent || exp.endDate)
    )

  return (
    <Dialog
      open={isExperienceDialogOpen}
      onOpenChange={setExperienceDialogOpen}
    >
      <DialogContent className="flex h-[80dvh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="font-medium text-gray-900 dark:text-white">
            Work Experiences
          </DialogTitle>
        </DialogHeader>

        <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="space-y-5 rounded-lg bg-gray-50/50 p-6 pb-8 dark:bg-zinc-900/30"
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleExperienceCollapse(exp.id)}
              >
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Experience {experiences.length > 1 ? index + 1 : ""}
                </h4>
                <div className="rounded-full bg-white p-1 shadow-sm transition-colors hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                  <ChevronUp
                    className={`size-4 text-gray-500 transition-transform ${exp.isCollapsed ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {!exp.isCollapsed && (
                <div className="animate-in space-y-5 fade-in slide-in-from-top-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-400">
                      Role
                    </label>
                    <Input
                      placeholder="Enter role"
                      className="h-10 bg-white placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(exp.id, { role: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-400">
                      Company
                    </label>
                    <Input
                      placeholder="Enter company name"
                      className="h-10 bg-white placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-400">
                      Employment Type
                    </label>
                    <Select
                      value={exp.employmentType}
                      onValueChange={(value) =>
                        updateExperience(exp.id, { employmentType: value })
                      }
                    >
                      <SelectTrigger
                        size="md"
                        className="w-full bg-white placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
                      >
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent>
                        {EMPLOYMENT_TYPES.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600 dark:text-gray-400">
                        Start Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-10 w-full justify-start border-gray-200 bg-white text-left font-normal placeholder:text-gray-300 dark:border-zinc-800 dark:bg-zinc-950",
                              !exp.startDate && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {exp.startDate ? (
                              format(new Date(exp.startDate), "PPP")
                            ) : (
                              <span>Select start date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              exp.startDate
                                ? new Date(exp.startDate)
                                : undefined
                            }
                            onSelect={(date) =>
                              updateExperience(exp.id, {
                                startDate: date ? date.toISOString() : "",
                              })
                            }
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600 dark:text-gray-400">
                        End Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={exp.isCurrent}
                            className={cn(
                              "h-10 w-full justify-start border-gray-200 bg-white text-left font-normal placeholder:text-gray-300 dark:border-zinc-800 dark:bg-zinc-950",
                              !exp.endDate && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {exp.endDate ? (
                              format(new Date(exp.endDate), "PPP")
                            ) : (
                              <span>select end date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              exp.endDate ? new Date(exp.endDate) : undefined
                            }
                            onSelect={(date) =>
                              updateExperience(exp.id, {
                                endDate: date ? date.toISOString() : "",
                              })
                            }
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={exp.isCurrent}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          isCurrent: e.target.checked,
                        })
                      }
                    />
                    <label
                      htmlFor={`current-${exp.id}`}
                      className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      I'm currently working in this role
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-400">
                      Location
                    </label>
                    <Select
                      value={exp.location}
                      onValueChange={(value) =>
                        updateExperience(exp.id, { location: value })
                      }
                    >
                      <SelectTrigger
                        size="md"
                        className="w-full bg-white placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="london">London, UK</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-400">
                      Location Type
                    </label>
                    <Select
                      value={exp.locationType}
                      onValueChange={(value) =>
                        updateExperience(exp.id, { locationType: value })
                      }
                    >
                      <SelectTrigger
                        size="md"
                        className="w-full bg-white placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
                      >
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-site">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm text-gray-600 dark:text-gray-400">
                        Details
                      </label>
                      <span className="text-xs text-gray-800 dark:text-gray-400">
                        {exp.details.length}/100
                      </span>
                    </div>
                    <Textarea
                      placeholder="Give us details about your role on the project"
                      className="min-h-[120px] resize-none bg-white placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
                      value={exp.details}
                      onChange={(e) =>
                        updateExperience(exp.id, { details: e.target.value })
                      }
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-400">
                      Skills
                    </label>
                    <Select
                      onValueChange={(value) => {
                        if (!exp.skills.includes(value)) {
                          updateExperience(exp.id, {
                            skills: [...exp.skills, value],
                          })
                        }
                      }}
                    >
                      <SelectTrigger
                        size="md"
                        className="w-full bg-white text-gray-400 placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
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
                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.skills.map((skill) => (
                          <div
                            key={skill}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-300"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() =>
                                updateExperience(exp.id, {
                                  skills: exp.skills.filter((s) => s !== skill),
                                })
                              }
                              className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-400">
                      Tools
                    </label>
                    <Select
                      onValueChange={(value) => {
                        if (!exp.tools.includes(value)) {
                          updateExperience(exp.id, {
                            tools: [...exp.tools, value],
                          })
                        }
                      }}
                    >
                      <SelectTrigger
                        size="md"
                        className="w-full bg-white text-gray-400 placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-gray-600"
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
                    {exp.tools.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tools.map((tool) => (
                          <div
                            key={tool}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-300"
                          >
                            {tool}
                            <button
                              type="button"
                              onClick={() =>
                                updateExperience(exp.id, {
                                  tools: exp.tools.filter((t) => t !== tool),
                                })
                              }
                              className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            Add work experience
          </button>
        </div>

        <DialogFooter className="flex items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
          <Button
            variant="outline"
            className="h-10 flex-1 border-gray-200 px-12 font-medium sm:flex-none dark:border-zinc-800"
            onClick={() => {
              setExperienceDialogOpen(false)
              resetExperiences()
            }}
          >
            Cancel
          </Button>
          <Button
            className="h-10 flex-1 border-none bg-gray-200 px-12 font-medium text-gray-400 hover:bg-gray-300 sm:flex-none dark:bg-zinc-800 dark:text-gray-500 dark:hover:bg-zinc-700"
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

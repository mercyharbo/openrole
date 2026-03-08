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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const YEARS = Array.from({ length: 50 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
)

export function AddExperienceDialog() {
  const {
    isExperienceDialogOpen,
    setExperienceDialogOpen,
    experienceForm,
    setExperienceForm,
    resetExperienceForm,
  } = useProfileStore()

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Experience saved:", experienceForm)
    setExperienceDialogOpen(false)
    resetExperienceForm()
  }

  const isFormValid =
    experienceForm.title &&
    experienceForm.companyName &&
    experienceForm.employmentType &&
    experienceForm.startMonth &&
    experienceForm.startYear &&
    (experienceForm.isCurrent ||
      (experienceForm.endMonth && experienceForm.endYear))

  return (
    <Dialog
      open={isExperienceDialogOpen}
      onOpenChange={setExperienceDialogOpen}
    >
      <DialogContent className="scrollbar-hide flex h-[80dvh] max-w-2xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Add Experience
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="space-y-5 rounded-lg bg-gray-50/50 p-6 dark:bg-zinc-900/30">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Title*
              </label>
              <Input
                placeholder="Ex: Retail Sales Manager"
                className="bg-white dark:bg-zinc-950"
                value={experienceForm.title}
                onChange={(e) => setExperienceForm({ title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Employment type
              </label>
              <Select
                value={experienceForm.employmentType}
                onValueChange={(value) =>
                  setExperienceForm({ employmentType: value })
                }
              >
                <SelectTrigger
                  size="default"
                  className="bg-white dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select" />
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

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Company name*
              </label>
              <Input
                placeholder="Ex: Microsoft"
                className="bg-white dark:bg-zinc-950"
                value={experienceForm.companyName}
                onChange={(e) =>
                  setExperienceForm({ companyName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Location
              </label>
              <Input
                placeholder="Ex: London, United Kingdom"
                className="bg-white dark:bg-zinc-950"
                value={experienceForm.location}
                onChange={(e) =>
                  setExperienceForm({ location: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="current"
                className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={experienceForm.isCurrent}
                onChange={(e) =>
                  setExperienceForm({ isCurrent: e.target.checked })
                }
              />
              <label
                htmlFor="current"
                className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                I am currently working in this role
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400">
                  Start date*
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={experienceForm.startMonth}
                    onValueChange={(value) =>
                      setExperienceForm({ startMonth: value })
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-zinc-950">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month) => (
                        <SelectItem key={month} value={month.toLowerCase()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={experienceForm.startYear}
                    onValueChange={(value) =>
                      setExperienceForm({ startYear: value })
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-zinc-950">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {!experienceForm.isCurrent && (
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600 dark:text-gray-400">
                    End date*
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={experienceForm.endMonth}
                      onValueChange={(value) =>
                        setExperienceForm({ endMonth: value })
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-zinc-950">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTHS.map((month) => (
                          <SelectItem key={month} value={month.toLowerCase()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={experienceForm.endYear}
                      onValueChange={(value) =>
                        setExperienceForm({ endYear: value })
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-zinc-950">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Description
              </label>
              <Textarea
                placeholder="Describe your responsibilities and achievements"
                className="min-h-[150px] resize-none bg-white dark:bg-zinc-950"
                value={experienceForm.description}
                onChange={(e) =>
                  setExperienceForm({ description: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
          <Button
            variant="outline"
            className="h-12 flex-1 px-12 sm:flex-none dark:border-zinc-800"
            onClick={() => {
              setExperienceDialogOpen(false)
              resetExperienceForm()
            }}
          >
            Cancel
          </Button>
          <Button
            className="h-12 flex-1 bg-gray-100 px-12 text-gray-400 hover:bg-gray-100 sm:flex-none dark:bg-zinc-900 dark:text-gray-500 dark:hover:bg-zinc-900"
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

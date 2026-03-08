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

import { useProfileStore } from "@/lib/store/profile-store"

const DEGREES = [
  "Bachelor's Degree",
  "Master's Degree",
  "PHD",
  "HND",
  "OND",
  "Associate Degree",
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

export function AddEducationDialog() {
  const {
    isEducationDialogOpen,
    setEducationDialogOpen,
    educationForm: formData,
    setEducationForm: setFormData,
    resetEducationForm,
  } = useProfileStore()

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Education saved:", formData)
    setEducationDialogOpen(false)
    resetEducationForm()
  }

  const isFormValid =
    formData.schoolName &&
    formData.degree &&
    formData.courseOfStudy &&
    (formData.currentlyEnrolled ||
      (formData.monthObtained && formData.yearObtained))

  return (
    <Dialog open={isEducationDialogOpen} onOpenChange={setEducationDialogOpen}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-100 px-6 py-4">
          <DialogTitle className="">Education</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 bg-white p-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">School Name</label>
            <Input
              placeholder="Enter school name"
              className="h-11 rounded-lg border-gray-200 focus:ring-primary/20"
              value={formData.schoolName}
              onChange={(e) =>
                setFormData({ ...formData, schoolName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Degree</label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, degree: value })
              }
            >
              <SelectTrigger
                size="default"
                className="h-10 w-full border-gray-200 transition-all focus:ring-primary/20 md:h-11"
              >
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                {DEGREES.map((deg) => (
                  <SelectItem key={deg} value={deg}>
                    {deg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">
              Course of Study
            </label>
            <Input
              placeholder="Enter course of study"
              className="h-11 rounded-lg border-gray-200 focus:ring-primary/20"
              value={formData.courseOfStudy}
              onChange={(e) =>
                setFormData({ ...formData, courseOfStudy: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Month Obtained
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, monthObtained: value })
                }
                disabled={formData.currentlyEnrolled}
              >
                <SelectTrigger
                  size="default"
                  className="h-10 w-full border-gray-200 transition-all focus:ring-primary/20 md:h-11"
                >
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Year Obtained
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, yearObtained: value })
                }
                disabled={formData.currentlyEnrolled}
              >
                <SelectTrigger
                  size="default"
                  className="h-10 w-full border-gray-200 transition-all focus:ring-primary/20 md:h-11"
                >
                  <SelectValue placeholder="Select one" />
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="currentlyEnrolled"
              className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
              checked={formData.currentlyEnrolled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentlyEnrolled: e.target.checked,
                })
              }
            />
            <label
              htmlFor="currentlyEnrolled"
              className="cursor-pointer text-sm text-gray-700"
            >
              Currently Enrolled
            </label>
          </div>
        </div>

        <DialogFooter className="flex flex-row items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row">
          <Button
            variant="outline"
            className="px-10 transition-colors"
            onClick={() => {
              setEducationDialogOpen(false)
              resetEducationForm()
            }}
          >
            Cancel
          </Button>
          <Button
            className="border-none bg-[#6B7281] px-10 text-white transition-all hover:bg-[#4B5563]"
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

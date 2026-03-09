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

export function AddCertificationDialog() {
  const {
    isCertificationDialogOpen,
    setCertificationDialogOpen,
    certificationForm: formData,
    setCertificationForm: setFormData,
    resetCertificationForm,
  } = useProfileStore()

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Certification saved:", formData)
    setCertificationDialogOpen(false)
    resetCertificationForm()
  }

  const isFormValid =
    formData.issuingOrganization &&
    formData.certificateTitle &&
    formData.monthObtained &&
    formData.yearObtained

  return (
    <Dialog
      open={isCertificationDialogOpen}
      onOpenChange={setCertificationDialogOpen}
    >
      <DialogContent className="flex h-[80dvh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-100 px-6 py-4">
          <DialogTitle className="">Certification</DialogTitle>
        </DialogHeader>

        <div className="scrollbar-hide flex-1 space-y-5 overflow-y-auto bg-white p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">
              Issuing Organization
            </label>
            <Input
              placeholder="Enter organization name"
              className="h-10 rounded-lg border-gray-200 focus:ring-primary/20"
              value={formData.issuingOrganization}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  issuingOrganization: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">
              Certificate Title
            </label>
            <Input
              placeholder="Enter certificate title"
              className="h-10 rounded-lg border-gray-200 focus:ring-primary/20"
              value={formData.certificateTitle}
              onChange={(e) =>
                setFormData({ ...formData, certificateTitle: e.target.value })
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
              >
                <SelectTrigger
                  size="md"
                  className="w-full border-gray-200 transition-all focus:ring-primary/20"
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
              >
                <SelectTrigger
                  size="md"
                  className="w-full border-gray-200 transition-all focus:ring-primary/20"
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

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Link</label>
            <Input
              placeholder="Paste certificate verification link"
              className="h-10 rounded-lg border-gray-200 focus:ring-primary/20"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row">
          <Button
            variant="outline"
            className="px-10 transition-colors"
            onClick={() => {
              setCertificationDialogOpen(false)
              resetCertificationForm()
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

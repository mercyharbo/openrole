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
import { ImagePlus } from "lucide-react"

export function AddBioDialog() {
  const {
    isBioDialogOpen,
    setBioDialogOpen,
    bioForm,
    setBioForm,
    resetBioForm,
  } = useProfileStore()

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Bio saved:", bioForm)
    setBioDialogOpen(false)
    resetBioForm()
  }

  return (
    <Dialog open={isBioDialogOpen} onOpenChange={setBioDialogOpen}>
      <DialogContent className="flex h-[80dvh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Bio
          </DialogTitle>
        </DialogHeader>

        <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Photo Upload Section */}
          <div className="flex items-center gap-6 rounded-lg bg-gray-50 p-6 dark:bg-zinc-900/50">
            <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-200 dark:border-zinc-800 dark:bg-zinc-900">
              <ImagePlus className="size-10 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="h-10 px-4">
                Upload new photo
              </Button>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  At least 800 x 800 px recommended.
                </p>
                <p className="text-sm text-gray-500">JPG or PNG is allowed.</p>
              </div>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="space-y-5 rounded-lg bg-gray-50/50 p-6 dark:bg-zinc-900/30">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400">
                  First Name*
                </label>
                <Input
                  placeholder="John"
                  className="h-10 bg-white dark:bg-zinc-950"
                  value={bioForm.firstName}
                  onChange={(e) => setBioForm({ firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400">
                  Last Name*
                </label>
                <Input
                  placeholder="Osimhen"
                  className="h-10 bg-white dark:bg-zinc-950"
                  value={bioForm.lastName}
                  onChange={(e) => setBioForm({ lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Role
              </label>
              <Select
                value={bioForm.role}
                onValueChange={(value) => setBioForm({ role: value })}
              >
                <SelectTrigger size="md" className="bg-white dark:bg-zinc-950">
                  <SelectValue placeholder="Select suitable role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600 dark:text-gray-400">
                  About
                </label>
                <span className="text-xs text-gray-400">
                  {bioForm.about.length}/100
                </span>
              </div>
              <Textarea
                placeholder="Tell us about yourself"
                className="min-h-[120px] resize-none bg-white dark:bg-zinc-950"
                value={bioForm.about}
                onChange={(e) => setBioForm({ about: e.target.value })}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Featured skills
              </label>
              <Select>
                <SelectTrigger
                  size="md"
                  className="bg-white text-gray-400 italic dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>{/* Skills will go here */}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Nationality
              </label>
              <Select
                value={bioForm.nationality}
                onValueChange={(value) => setBioForm({ nationality: value })}
              >
                <SelectTrigger
                  size="md"
                  className="bg-white text-gray-400 italic dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="ghana">Ghana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Phone Number
              </label>
              <div className="flex gap-2">
                <Select
                  value={bioForm.phoneCountryCode}
                  onValueChange={(value) =>
                    setBioForm({ phoneCountryCode: value })
                  }
                >
                  <SelectTrigger
                    size="md"
                    className="w-[100px] bg-white dark:bg-zinc-950"
                  >
                    <SelectValue placeholder="+ 234" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="234">+ 234</SelectItem>
                    <SelectItem value="1">+ 1</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="012 345 6789"
                  className="h-10 flex-1 bg-white dark:bg-zinc-950"
                  value={bioForm.phoneNumber}
                  onChange={(e) => setBioForm({ phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                LinkedIn Profile
              </label>
              <Input
                placeholder="Input URL link"
                className="h-10 bg-white italic placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-white/20"
                value={bioForm.linkedin}
                onChange={(e) => setBioForm({ linkedin: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Twitter profile
              </label>
              <Input
                placeholder="Input URL link"
                className="h-10 bg-white italic placeholder:text-gray-300 dark:bg-zinc-950 dark:placeholder:text-white/20"
                value={bioForm.twitter}
                onChange={(e) => setBioForm({ twitter: e.target.value })}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
          <Button
            variant="outline"
            className="h-12 flex-1 px-12 sm:flex-none dark:border-zinc-800"
            onClick={() => {
              setBioDialogOpen(false)
              resetBioForm()
            }}
          >
            Cancel
          </Button>
          <Button
            className="h-12 flex-1 bg-gray-100 px-12 text-gray-400 hover:bg-gray-100 sm:flex-none dark:bg-zinc-900 dark:text-gray-500 dark:hover:bg-zinc-900"
            onClick={handleSave}
            disabled={!bioForm.firstName || !bioForm.lastName}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

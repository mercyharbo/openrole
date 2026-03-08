"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useProfileStore } from "@/lib/store/profile-store"
import { Plus } from "lucide-react"
import { AddExperienceDialog } from "./add-experience-dialog"

/**
 * ExperienceTab component for the profile page.
 * Displays work experience or an empty state if none exists.
 */
export function ExperienceTab() {
  const { setExperienceDialogOpen } = useProfileStore()

  return (
    <>
      <Card className="gap-0 py-0">
        <CardHeader className="flex items-center justify-between py-3">
          <CardTitle className="text-lg">Work Experience</CardTitle>
          <CardAction>
            <Button
              variant="outline"
              size={"lg"}
              className="gap-2 px-6 dark:border-zinc-800"
              onClick={() => setExperienceDialogOpen(true)}
            >
              <Plus className="size-4" />
              Add
            </Button>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-lg text-black dark:text-white">Oops!!!</h3>
          <p className="text-gray-400 dark:text-gray-500">
            You haven't added any work experience to your profile yet.
          </p>
        </CardContent>
      </Card>

      <AddExperienceDialog />
    </>
  )
}

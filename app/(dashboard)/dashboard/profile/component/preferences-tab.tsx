"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAutoApplyPreferences } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { cn } from "@/lib/utils"
import { EditAutoApplyPreferencesDialog } from "./edit-auto-apply-preferences-dialog"
import { CreateAutoApplyPreferencesDialog } from "./create-auto-apply-preferences-dialog"
import { ProfileSkeleton } from "./profile-skeleton"

/**
 * PreferencesTab component for the profile page.
 * Rendering Auto Apply Preferences.
 */
export function PreferencesTab() {
  const { preferences, isLoading } = useAutoApplyPreferences()
  const { setAutoApplyPreferencesDialogOpen, setCreateAutoApplyPreferencesDialogOpen } = useProfileStore()

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!preferences) {
    return (
      <Card className="border-0 bg-muted/50 shadow-none">
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-lg text-black dark:text-white">Oops!!!</h3>
          <p className="text-gray-400 dark:text-gray-500">
            You haven&apos;t set your auto-apply preferences yet.
          </p>
          <Button
            className="mt-4"
            onClick={() => setCreateAutoApplyPreferencesDialogOpen(true)}
          >
            Create Preferences
          </Button>
        </CardContent>
      </Card>
    )
  }

  const preferenceFields = [
    { label: "Job Titles", value: preferences.job_titles },
    { label: "Work Modes", value: preferences.work_modes },
    { label: "Target Countries", value: preferences.countries },
    { label: "Experience Levels", value: preferences.experience_levels },
    {
      label: "Salary Range",
      value:
        preferences.salary_min || preferences.salary_max
          ? `$${preferences.salary_min?.toLocaleString()} - $${preferences.salary_max?.toLocaleString()}`
          : "Not specified",
    },
    {
      label: "Max Daily Applications",
      value: preferences.max_daily_applications,
    },
    {
      label: "Status",
      value: preferences.is_enabled ? "Enabled" : "Disabled",
      isStatus: true,
    },
  ]

  return (
    <main className="flex flex-col gap-5">
      <Card className="space-y-5 bg-muted/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium text-zinc-950 dark:text-zinc-50">
            Auto Apply Preferences
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoApplyPreferencesDialogOpen(true)}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {preferenceFields.map((field) => (
              <div key={field.label} className="space-y-5">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{field.label}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Array.isArray(field.value) ? (
                    field.value.length > 0 ? (
                      field.value.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="bg-primary/10 text-primary py-3 px-4 capitalize"
                        >
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        None specified
                      </p>
                    )
                  ) : field.isStatus ? (
                    <Badge
                      className={cn(
                        "border-0 font-medium",
                        preferences.is_enabled
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      )}
                    >
                      {field.value}
                    </Badge>
                  ) : (
                    <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      {field.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditAutoApplyPreferencesDialog />
      <CreateAutoApplyPreferencesDialog />
    </main>
  )
}

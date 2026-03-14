"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useApi } from "@/hooks/use-api"
import { useAutoApplyPreferences } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as z from "zod"
import { Badge } from "@/components/ui/badge"

const autoApplySchema = z.object({
  job_titles: z.string(),
  work_modes: z.array(z.string()),
  countries: z.string(),
  experience_levels: z.array(z.string()),
  salary_min: z.coerce.number(),
  salary_max: z.coerce.number(),
  max_daily_applications: z.coerce.number(),
  is_enabled: z.boolean(),
})

type AutoApplyFormValues = z.infer<typeof autoApplySchema>

const WORK_MODES = [
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "onsite", label: "On-site" },
]

const EXPERIENCE_LEVELS = [
  { id: "internship", label: "Internship" },
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior Level" },
  { id: "executive", label: "Executive" },
]

export function EditAutoApplyPreferencesDialog() {
  const { isAutoApplyPreferencesDialogOpen, setAutoApplyPreferencesDialogOpen } = useProfileStore()
  const { put } = useApi()
  const { preferences, refreshPreferences } = useAutoApplyPreferences()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AutoApplyFormValues>({
    resolver: zodResolver(autoApplySchema) as Resolver<AutoApplyFormValues>,
    defaultValues: {
      job_titles: "",
      work_modes: [],
      countries: "",
      experience_levels: [],
      is_enabled: true,
    },
  })

  useEffect(() => {
    if (isAutoApplyPreferencesDialogOpen && preferences) {
      form.reset({
        job_titles: preferences.job_titles.join(", "),
        work_modes: preferences.work_modes || [],
        countries: preferences.countries.join(", "),
        experience_levels: preferences.experience_levels || [],
        salary_min: preferences.salary_min || undefined,
        salary_max: preferences.salary_max || undefined,
        max_daily_applications: preferences.max_daily_applications || undefined,
        is_enabled: preferences.is_enabled ?? true,
      })
    }
  }, [isAutoApplyPreferencesDialogOpen, preferences, form])

  const onSubmit: SubmitHandler<AutoApplyFormValues> = async (values) => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...values,
        job_titles: values.job_titles.split(",").map(t => t.trim()).filter(t => t !== ""),
        countries: values.countries.split(",").map(c => c.trim()).filter(c => c !== ""),
      }

      const { error } = await put("applicants/auto-apply/preferences", payload)

      if (error) {
        toast.error(error)
        form.setError("root", { message: error })
        return
      }

      toast.success("Preferences updated successfully")
      await refreshPreferences()
      setAutoApplyPreferencesDialogOpen(false)
    } catch (err) {
      const msg = (err as Error)?.message || "An error occurred"
      toast.error(msg)
      form.setError("root", { message: msg })
      console.error("An error occurred:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isAutoApplyPreferencesDialogOpen} onOpenChange={setAutoApplyPreferencesDialogOpen}>
      <DialogContent className="flex h-[80dvh] w-full max-w-2xl lg:max-w-xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Edit Auto Apply Preferences
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {form.formState.errors.root && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {form.formState.errors.root.message}
                </div>
              )}

              <div className="space-y-6">
                {/* Job Titles */}
                <FormField<AutoApplyFormValues, "job_titles">
                  control={form.control}
                  name="job_titles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Job Titles (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Software Engineer, Product Manager"
                          className="h-10 bg-white dark:bg-zinc-950"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Target Countries */}
                <FormField<AutoApplyFormValues, "countries">
                  control={form.control}
                  name="countries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Target Countries (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Nigeria, United Kingdom, USA"
                          className="h-10 bg-white dark:bg-zinc-950"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Work Modes */}
                <FormField<AutoApplyFormValues, "work_modes">
                  control={form.control}
                  name="work_modes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Work Modes</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {WORK_MODES.map((mode) => {
                            const valArray = Array.isArray(field.value) ? field.value : []
                            const isSelected = valArray.includes(mode.id)
                            return (
                              <Badge
                                key={mode.id}
                                variant={isSelected ? "default" : "secondary"}
                                className={`cursor-pointer rounded-full px-4 py-4 text-xs font-normal ${
                                  isSelected
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
                                }`}
                                onClick={() => {
                                  const newValue = isSelected
                                    ? valArray.filter((id) => id !== mode.id)
                                    : [...valArray, mode.id]
                                  field.onChange(newValue)
                                }}
                              >
                                {mode.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Experience Levels */}
                <FormField<AutoApplyFormValues, "experience_levels">
                  control={form.control}
                  name="experience_levels"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Experience Levels</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {EXPERIENCE_LEVELS.map((level) => {
                            const valArray = Array.isArray(field.value) ? field.value : []
                            const isSelected = valArray.includes(level.id)
                            return (
                              <Badge
                                key={level.id}
                                variant={isSelected ? "default" : "secondary"}
                                className={`cursor-pointer rounded-full px-4 py-4 text-xs font-normal ${
                                  isSelected
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
                                }`}
                                onClick={() => {
                                  const newValue = isSelected
                                    ? valArray.filter((id) => id !== level.id)
                                    : [...valArray, level.id]
                                  field.onChange(newValue)
                                }}
                              >
                                {level.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  {/* Min Salary */}
                  <FormField<AutoApplyFormValues, "salary_min">
                    control={form.control}
                    name="salary_min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Min Salary ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Max Salary */}
                  <FormField<AutoApplyFormValues, "salary_max">
                    control={form.control}
                    name="salary_max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Max Salary ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Max Daily Apps */}
                <FormField<AutoApplyFormValues, "max_daily_applications">
                  control={form.control}
                  name="max_daily_applications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Max Daily Applications</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          className="h-10 bg-white dark:bg-zinc-950"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Is Enabled? */}
                <FormField<AutoApplyFormValues, "is_enabled">
                  control={form.control}
                  name="is_enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-semibold text-gray-900 dark:text-gray-100">
                          Automated Application
                        </FormLabel>
                        <div className="text-sm text-gray-500">
                          Enabling this allows our system to automatically apply for jobs matching your preferences.
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAutoApplyPreferencesDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

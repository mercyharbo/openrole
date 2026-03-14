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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useApi } from "@/hooks/use-api"
import { useApplicantProfile } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Badge } from "@/components/ui/badge"

const jobPrefsSchema = z.object({
  job_preferences: z.object({
    work_arrangement: z.string().optional().nullable(),
    job_types: z.array(z.string()),
    willing_to_relocate: z.boolean(),
    preferred_locations: z.string().optional().nullable(),
    notice_period: z.string().optional().nullable(),
    earliest_start_date: z.string().optional().nullable(),
    travel_willingness: z.string().optional().nullable(),
    referral_source: z.string().optional().nullable(),
  }),
})

type JobPrefsFormValues = z.infer<typeof jobPrefsSchema>

const JOB_TYPES = [
  { id: "full_time", label: "Full-time" },
  { id: "part_time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
]

export function EditJobPreferencesDialog() {
  const { isJobPreferencesDialogOpen, setJobPreferencesDialogOpen } = useProfileStore()
  const { patch } = useApi()
  const { applicant, refreshApplicant } = useApplicantProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<JobPrefsFormValues>({
    resolver: zodResolver(jobPrefsSchema) as Resolver<JobPrefsFormValues>,
    defaultValues: {
      job_preferences: {
        work_arrangement: "remote",
        job_types: [],
        willing_to_relocate: false,
        preferred_locations: "",
        notice_period: "immediate",
        earliest_start_date: "",
        travel_willingness: "none",
        referral_source: "",
      },
    },
  })

  useEffect(() => {
    if (isJobPreferencesDialogOpen && applicant) {
      const prefs = (applicant.job_preferences as Partial<JobPrefsFormValues["job_preferences"]>) || {}
      form.reset({
        job_preferences: {
          work_arrangement: prefs.work_arrangement || "remote",
          job_types: Array.isArray(prefs.job_types) ? prefs.job_types : [],
          willing_to_relocate: prefs.willing_to_relocate ?? false,
          preferred_locations: prefs.preferred_locations || "",
          notice_period: prefs.notice_period || "immediate",
          earliest_start_date: prefs.earliest_start_date || "",
          travel_willingness: prefs.travel_willingness || "none",
          referral_source: prefs.referral_source || "",
        },
      })
    }
  }, [isJobPreferencesDialogOpen, applicant, form])

  const onSubmit: SubmitHandler<JobPrefsFormValues> = async (values) => {
    setIsSubmitting(true)
    try {
      const { error } = await patch("applicants/me", {
        job_preferences: values.job_preferences,
      })

      if (error) {
        toast.error(error)
        form.setError("root", { message: error })
        return
      }

      toast.success("Job preferences updated successfully")
      await refreshApplicant()
      setJobPreferencesDialogOpen(false)
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
    <Dialog open={isJobPreferencesDialogOpen} onOpenChange={setJobPreferencesDialogOpen}>
      <DialogContent className="flex h-[80dvh] w-full max-w-2xl lg:max-w-xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Edit Job Preferences
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
                {/* Work Arrangement */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.work_arrangement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Work Arrangement</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={(field.value as string) || undefined}
                      >
                        <FormControl>
                          <SelectTrigger size="md" className="w-full h-10 bg-white dark:bg-zinc-950">
                            <SelectValue placeholder="Select arrangement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="on-site">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Types */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.job_types"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Job Types</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {JOB_TYPES.map((type) => {
                            const valArray = (field.value as string[]) || []
                            const isSelected = valArray.includes(type.id)
                            return (
                              <Badge
                                key={type.id}
                                variant={isSelected ? "default" : "secondary"}
                                className={`cursor-pointer rounded-full px-4 py-4 text-sm font-normal ${
                                  isSelected
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
                                }`}
                                onClick={() => {
                                  const newValue = isSelected
                                    ? valArray.filter((id) => id !== type.id)
                                    : [...valArray, type.id]
                                  field.onChange(newValue)
                                }}
                              >
                                {type.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Willing to Relocate? */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.willing_to_relocate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg">
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Willing to Relocate?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Preferred Locations */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.preferred_locations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Preferred Locations (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., London, Berlin, Remote"
                          className="h-10 bg-white dark:bg-zinc-950"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notice Period */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.notice_period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Notice Period</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={(field.value as string) || undefined}
                      >
                        <FormControl>
                          <SelectTrigger size="md" className="w-full h-10 bg-white dark:bg-zinc-950">
                            <SelectValue placeholder="Select notice period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="1_week">1 Week</SelectItem>
                          <SelectItem value="2_weeks">2 Weeks</SelectItem>
                          <SelectItem value="1_month">1 Month</SelectItem>
                          <SelectItem value="2_months">2 Months</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Earliest Start Date */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.earliest_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Earliest Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full h-10 pl-3 text-left font-normal bg-white dark:bg-zinc-950",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value as string), "MM/dd/yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value as string) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Travel Willingness */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.travel_willingness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">Travel Willingness</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={(field.value as string) || "none"}
                      >
                        <FormControl>
                          <SelectTrigger size="md" className="w-full h-10 bg-white dark:bg-zinc-950">
                            <SelectValue placeholder="Select willingness" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="no_travel">No Travel</SelectItem>
                          <SelectItem value="occasional">Occasional (&lt; 25%)</SelectItem>
                          <SelectItem value="moderate">Moderate (25-50%)</SelectItem>
                          <SelectItem value="frequent">Frequent (&gt; 50%)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Referral Source */}
                <FormField<JobPrefsFormValues>
                  control={form.control}
                  name="job_preferences.referral_source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium dark:text-gray-100">How did you hear about us? (default answer)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={(field.value as string) || undefined}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full h-10 bg-white dark:bg-zinc-950">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="indeed">Indeed</SelectItem>
                          <SelectItem value="glassdoor">Glassdoor</SelectItem>
                          <SelectItem value="social_media">Social Media</SelectItem>
                          <SelectItem value="referral">Referral (Friend/Family)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
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
                  onClick={() => setJobPreferencesDialogOpen(false)}
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

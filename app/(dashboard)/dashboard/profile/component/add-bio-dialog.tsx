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
import { Textarea } from "@/components/ui/textarea"
import { useApi } from "@/hooks/use-api"
import { useApplicantProfile } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, ChevronUp, ImagePlus, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as z from "zod"

const JOB_TYPES = [
  { id: "full_time", label: "Full-time" },
  { id: "part_time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
  { id: "freelance", label: "Freelance" },
]

const bioFormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  location: z.string().optional(),
  social_links: z.object({
    linkedin_url: z.string().optional().nullable(),
    github_url: z.string().optional().nullable(),
    x_url: z.string().optional().nullable(),
    instagram_url: z.string().optional().nullable(),
    reddit_url: z.string().optional().nullable(),
    website_url: z.string().optional().nullable(),
    portfolio_urls: z.string().optional().nullable(),
  }),
  personal_info: z.object({
    phone: z.string().optional().nullable(),
    date_of_birth: z.string().optional().nullable(),
    nationality: z.string().optional().nullable(),
    address_city: z.string().optional().nullable(),
    address_country: z.string().optional().nullable(),
    address_postal_code: z.string().optional().nullable(),
    address_state: z.string().optional().nullable(),
    address_street: z.string().optional().nullable(),
    country_of_residence: z.string().optional().nullable(),
    emergency_contact_name: z.string().optional().nullable(),
    emergency_contact_phone: z.string().optional().nullable(),
    emergency_contact_relationship: z.string().optional().nullable(),
  }),
  job_preferences: z.object({
    work_arrangement: z.string().optional().nullable(),
    job_types: z.array(z.string()),
    earliest_start_date: z.string().optional().nullable(),
    notice_period: z.string().optional().nullable(),
    preferred_locations: z.string().optional().nullable(),
    referral_source: z.string().optional().nullable(),
    travel_willingness: z.string().optional().nullable(),
    willing_to_relocate: z.boolean(),
  }),
})

type BioFormValues = z.infer<typeof bioFormSchema>

export function AddBioDialog() {
  const { isBioDialogOpen, setBioDialogOpen } = useProfileStore()
  const { patch } = useApi()
  const { applicant, refreshApplicant } = useApplicantProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioFormSchema) as Resolver<BioFormValues>,
    defaultValues: {
      full_name: "",
      username: "",
      location: "",
      social_links: {
        linkedin_url: "",
        github_url: "",
        x_url: "",
        instagram_url: "",
        reddit_url: "",
        website_url: "",
        portfolio_urls: "",
      },
      personal_info: {
        phone: "",
        date_of_birth: "",
        nationality: "",
        address_city: "",
        address_country: "",
        address_postal_code: "",
        address_state: "",
        address_street: "",
        country_of_residence: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        emergency_contact_relationship: "",
      },
      job_preferences: {
        work_arrangement: "remote",
        job_types: ["full_time"],
        earliest_start_date: "",
        notice_period: "immediate",
        preferred_locations: "",
        referral_source: "",
        travel_willingness: "none",
        willing_to_relocate: false,
      },
    },
  })

  // Initialize form with current data when dialog opens
  useEffect(() => {
    if (isBioDialogOpen && applicant) {
      form.reset({
        full_name: applicant.full_name || "",
        username: applicant.username || "",
        location: applicant.location || "",
        social_links: {
          linkedin_url: applicant.social_links?.linkedin_url || "",
          github_url: applicant.social_links?.github_url || "",
          x_url: applicant.social_links?.x_url || "",
          instagram_url: applicant.social_links?.instagram_url || "",
          reddit_url: applicant.social_links?.reddit_url || "",
          website_url: applicant.social_links?.website_url || "",
          portfolio_urls: applicant.social_links?.portfolio_urls || "",
        },
        personal_info: {
          phone:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.phone || "",
          date_of_birth:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.date_of_birth || "",
          nationality:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.nationality || "",
          address_city:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.address_city || "",
          address_country:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.address_country || "",
          address_postal_code:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.address_postal_code || "",
          address_state:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.address_state || "",
          address_street:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.address_street || "",
          country_of_residence:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.country_of_residence || "",
          emergency_contact_name:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.emergency_contact_name || "",
          emergency_contact_phone:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.emergency_contact_phone || "",
          emergency_contact_relationship:
            (applicant.personal_info as BioFormValues["personal_info"])
              ?.emergency_contact_relationship || "",
        },
        job_preferences: {
          work_arrangement:
            (applicant.job_preferences as BioFormValues["job_preferences"])
              ?.work_arrangement || "remote",
          job_types: (
            applicant.job_preferences as BioFormValues["job_preferences"]
          )?.job_types || ["full_time"],
          earliest_start_date:
            (applicant.job_preferences as BioFormValues["job_preferences"])
              ?.earliest_start_date || "",
          notice_period:
            (applicant.job_preferences as BioFormValues["job_preferences"])
              ?.notice_period || "immediate",
          preferred_locations:
            (applicant.job_preferences as BioFormValues["job_preferences"])
              ?.preferred_locations || "",
          referral_source:
            (applicant.job_preferences as BioFormValues["job_preferences"])
              ?.referral_source || "",
          travel_willingness:
            (applicant.job_preferences as BioFormValues["job_preferences"])
              ?.travel_willingness || "none",
          willing_to_relocate:
            (applicant.job_preferences as BioFormValues["job_preferences"])
              ?.willing_to_relocate ?? false,
        },
      })
    }
  }, [isBioDialogOpen, applicant, form])

  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false)
  const [isJobPreferencesOpen, setIsJobPreferencesOpen] = useState(false)

  const onSubmit: SubmitHandler<BioFormValues> = async (values) => {
    setIsSubmitting(true)
    try {
      // Normalize and clean values
      const cleanSocialLinks = Object.entries(values.social_links).reduce(
        (acc, [key, value]) => {
          if (!value || value === "") {
            acc[key as keyof BioFormValues["social_links"]] = null
          } else {
            if (key === "portfolio_urls") {
              // Handle multiple URLs (one per line)
              const normalized = value
                .split("\n")
                .map((url) => {
                  const trimmed = url.trim()
                  if (!trimmed) return ""
                  return /^https?:\/\//i.test(trimmed)
                    ? trimmed
                    : `https://${trimmed}`
                })
                .filter(Boolean)
                .join("\n")
              acc[key] = normalized || null
            } else {
              // Add https:// if missing for single URLs
              const normalized = /^https?:\/\//i.test(value)
                ? value
                : `https://${value}`
              acc[key as keyof BioFormValues["social_links"]] = normalized
            }
          }
          return acc
        },
        {} as Record<string, string | null>
      )

      const { error } = await patch("applicants/me", {
        ...values,
        social_links: cleanSocialLinks,
        personal_info: values.personal_info,
        job_preferences: values.job_preferences,
      })

      if (error) {
        toast.error(error)
        form.setError("root", { message: error })
        return
      }

      toast.success("Profile updated successfully")
      await refreshApplicant()
      setBioDialogOpen(false)
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
    <Dialog open={isBioDialogOpen} onOpenChange={setBioDialogOpen}>
      <DialogContent className="flex h-[80dvh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Bio
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
              {/* Photo Upload Section */}
              <div className="flex items-center gap-6 rounded-lg bg-gray-50 p-6 dark:bg-zinc-900/50">
                <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-200 dark:border-zinc-800 dark:bg-zinc-900">
                  <ImagePlus className="size-10 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="space-y-3">
                  <Button type="button" variant="outline" className="h-10 px-4">
                    Upload new photo
                  </Button>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">
                      At least 800 x 800 px recommended.
                    </p>
                    <p className="text-sm text-gray-500">
                      JPG or PNG is allowed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="space-y-5 rounded-lg bg-gray-50/50 p-6 dark:bg-zinc-900/30">
                <div className="grid grid-cols-2 gap-4">
                  <FormField<BioFormValues>
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Osimhen"
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField<BioFormValues>
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john_o"
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField<BioFormValues>
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Lagos, Nigeria"
                          className="h-10 bg-white dark:bg-zinc-950"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField<BioFormValues>
                    control={form.control}
                    name="social_links.linkedin_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/..."
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField<BioFormValues>
                    control={form.control}
                    name="social_links.github_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/..."
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField<BioFormValues>
                    control={form.control}
                    name="social_links.x_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>X (Twitter) URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://x.com/..."
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField<BioFormValues>
                    control={form.control}
                    name="social_links.instagram_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://instagram.com/..."
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField<BioFormValues>
                    control={form.control}
                    name="social_links.reddit_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reddit URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://reddit.com/u/..."
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField<BioFormValues>
                    control={form.control}
                    name="social_links.website_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            className="h-10 bg-white dark:bg-zinc-950"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField<BioFormValues>
                  control={form.control}
                  name="social_links.portfolio_urls"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio URLs (one per line)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            "https://portfolio1.com\nhttps://behance.net/yourprofile\nhttps://dribbble.com/yourprofile"
                          }
                          className="min-h-[120px] bg-white dark:bg-zinc-950"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Personal Information Collapsible Section */}
                <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <button
                    type="button"
                    onClick={() => setIsPersonalInfoOpen(!isPersonalInfoOpen)}
                    className="flex w-full items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span>Personal Information</span>
                    {isPersonalInfoOpen ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </button>

                  {isPersonalInfoOpen && (
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 08012345678"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.date_of_birth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationality</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Nigerian"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.country_of_residence"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country of Residence</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Nigeria"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2">
                        <FormField<BioFormValues>
                          control={form.control}
                          name="personal_info.address_street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. No 20, idowu kolade street"
                                  className="h-10"
                                  {...field}
                                  value={(field.value as string) ?? ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.address_city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Osogbo"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.address_state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Osun"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.address_country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Country</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Nigeria"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.address_postal_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 12701"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2 pt-2 text-sm font-medium text-gray-500">
                        Emergency Contact
                      </div>
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.emergency_contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Full Name"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField<BioFormValues>
                        control={form.control}
                        name="personal_info.emergency_contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Phone Number"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-2">
                        <FormField<BioFormValues>
                          control={form.control}
                          name="personal_info.emergency_contact_relationship"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Relationship</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Spouse, Parent, etc."
                                  className="h-10"
                                  {...field}
                                  value={(field.value as string) ?? ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Preferences Collapsible Section */}
                <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <button
                    type="button"
                    onClick={() =>
                      setIsJobPreferencesOpen(!isJobPreferencesOpen)
                    }
                    className="flex w-full items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span>Job Preferences</span>
                    {isJobPreferencesOpen ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </button>

                  {isJobPreferencesOpen && (
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <FormField<BioFormValues>
                        control={form.control}
                        name="job_preferences.work_arrangement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Arrangement</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={
                                (field.value as string) || undefined
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select arrangement" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                <SelectItem value="onsite">On-site</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField<BioFormValues>
                        control={form.control}
                        name="job_preferences.notice_period"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notice Period</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={
                                (field.value as string) || undefined
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select notice period" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="immediate">
                                  Immediate
                                </SelectItem>
                                <SelectItem value="1_week">1 Week</SelectItem>
                                <SelectItem value="2_weeks">2 Weeks</SelectItem>
                                <SelectItem value="1_month">1 Month</SelectItem>
                                <SelectItem value="2_months">
                                  2 Months
                                </SelectItem>
                                <SelectItem value="3_months">
                                  3 Months
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField<BioFormValues>
                        control={form.control}
                        name="job_preferences.earliest_start_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Earliest Start Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField<BioFormValues>
                        control={form.control}
                        name="job_preferences.travel_willingness"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Travel Willingness</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={
                                (field.value as string) || undefined
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select travel" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="occasional">
                                  Occasional
                                </SelectItem>
                                <SelectItem value="frequent">
                                  Frequent
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2">
                        <FormField<BioFormValues>
                          control={form.control}
                          name="job_preferences.preferred_locations"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Locations</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Lagos, Abuja, Berlin"
                                  className="h-10"
                                  {...field}
                                  value={(field.value as string) ?? ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField<BioFormValues>
                        control={form.control}
                        name="job_preferences.willing_to_relocate"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-100 p-3 shadow-sm dark:border-zinc-800">
                            <div className="space-y-0.5">
                              <FormLabel>Willing to Relocate</FormLabel>
                            </div>
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value as boolean}
                                onChange={field.onChange}
                                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField<BioFormValues>
                        control={form.control}
                        name="job_preferences.referral_source"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How did you hear about us?</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. LinkedIn, Friend, etc."
                                className="h-10"
                                {...field}
                                value={(field.value as string) ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2 space-y-3">
                        <FormLabel>Job Types</FormLabel>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {JOB_TYPES.map((type) => (
                            <FormField<BioFormValues>
                              key={type.id}
                              control={form.control}
                              name="job_preferences.job_types"
                              render={({ field }) => {
                                const jobTypes = field.value as string[]
                                return (
                                  <FormItem
                                    key={type.id}
                                    className="flex flex-row items-start space-y-0 space-x-3 rounded-md border border-gray-100 p-3 dark:border-zinc-800"
                                  >
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={jobTypes?.includes(type.id)}
                                        onChange={(e) => {
                                          const checked = e.target.checked
                                          const prev = jobTypes || []
                                          const next = checked
                                            ? [...prev, type.id]
                                            : prev.filter(
                                                (val) => val !== type.id
                                              )
                                          field.onChange(next)
                                        }}
                                        className="mt-1 size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {type.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-gray-100 bg-gray-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex w-full items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setBioDialogOpen(false)}
                  className="h-11 px-6 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 bg-blue-600 px-8 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

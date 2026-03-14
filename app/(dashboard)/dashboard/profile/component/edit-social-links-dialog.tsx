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
import { Textarea } from "@/components/ui/textarea"
import { useApi } from "@/hooks/use-api"
import { useApplicantProfile } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as z from "zod"

const socialLinksSchema = z.object({
  social_links: z.object({
    linkedin_url: z.string().optional().nullable(),
    github_url: z.string().optional().nullable(),
    x_url: z.string().optional().nullable(),
    instagram_url: z.string().optional().nullable(),
    reddit_url: z.string().optional().nullable(),
    website_url: z.string().optional().nullable(),
    portfolio_urls: z.string().optional().nullable(),
  }),
})

type SocialLinksValues = z.infer<typeof socialLinksSchema>

export function EditSocialLinksDialog() {
  const { isSocialLinksDialogOpen, setSocialLinksDialogOpen } =
    useProfileStore()
  const { patch } = useApi()
  const { applicant, refreshApplicant } = useApplicantProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SocialLinksValues>({
    resolver: zodResolver(socialLinksSchema) as Resolver<SocialLinksValues>,
    defaultValues: {
      social_links: {
        linkedin_url: "",
        github_url: "",
        x_url: "",
        instagram_url: "",
        reddit_url: "",
        website_url: "",
        portfolio_urls: "",
      },
    },
  })

  useEffect(() => {
    if (isSocialLinksDialogOpen && applicant) {
      form.reset({
        social_links: {
          linkedin_url: applicant.social_links?.linkedin_url || "",
          github_url: applicant.social_links?.github_url || "",
          x_url: applicant.social_links?.x_url || "",
          instagram_url: applicant.social_links?.instagram_url || "",
          reddit_url: applicant.social_links?.reddit_url || "",
          website_url: applicant.social_links?.website_url || "",
          portfolio_urls: applicant.social_links?.portfolio_urls || "",
        },
      })
    }
  }, [isSocialLinksDialogOpen, applicant, form])

  const onSubmit: SubmitHandler<SocialLinksValues> = async (values) => {
    setIsSubmitting(true)
    try {
      // Normalize and clean values
      const cleanSocialLinks = Object.entries(values.social_links).reduce(
        (acc, [key, value]) => {
          if (!value || value === "") {
            acc[key as keyof SocialLinksValues["social_links"]] = null
          } else {
            if (key === "portfolio_urls") {
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
              const normalized = /^https?:\/\//i.test(value)
                ? value
                : `https://${value}`
              acc[key as keyof SocialLinksValues["social_links"]] = normalized
            }
          }
          return acc
        },
        {} as Record<string, string | null>
      )

      const { error } = await patch("applicants/me", {
        social_links: cleanSocialLinks,
      })

      if (error) {
        toast.error(error)
        return
      }

      toast.success("Social links updated successfully")
      await refreshApplicant()
      setSocialLinksDialogOpen(false)
    } catch (err) {
      const msg = (err as Error)?.message || "An error occurred"
      toast.error(msg)
      console.error("An error occurred:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={isSocialLinksDialogOpen}
      onOpenChange={setSocialLinksDialogOpen}
    >
      <DialogContent className="scrollbar-hide flex w-full max-w-2xl flex-col gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Social Links
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto p-6">
              <div className="space-y-5 rounded-lg bg-gray-50/50 p-6 dark:bg-zinc-900/30">
                <div className="grid grid-cols-2 gap-4">
                  <FormField<SocialLinksValues>
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
                  <FormField<SocialLinksValues>
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
                  <FormField<SocialLinksValues>
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
                  <FormField<SocialLinksValues>
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
                  <FormField<SocialLinksValues>
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
                  <FormField<SocialLinksValues>
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

                <FormField<SocialLinksValues>
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
              </div>
            </div>

            <DialogFooter className="border-t border-gray-100 bg-gray-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex w-full items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSocialLinksDialogOpen(false)}
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

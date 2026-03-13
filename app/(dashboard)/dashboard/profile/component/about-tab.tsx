"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProfileStore } from "@/lib/store/profile-store"
import { useApplicantProfile } from "@/hooks/use-queries"
import { ImagePlus, Link2, Plus } from "lucide-react"
import { AddBioDialog } from "./add-bio-dialog"
import React from "react"
import { Badge } from "@/components/ui/badge"

/**
 * AboutTab component for the profile page.
 * Follows the high-fidelity UI layout provided in the attachment.
 */
export function AboutTab() {
  const { setBioDialogOpen } = useProfileStore()
  const { applicant, isLoading } = useApplicantProfile()

  if (isLoading) {
    return (
      <Card className="gap-3 border-none py-3 shadow-none">
        <CardContent className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-gray-500">Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Check if there's any data
  const hasData = applicant && (
    (applicant.extracted_profile as any)?.bio || 
    (applicant.skills && applicant.skills.length > 0) ||
    (applicant.personal_info as any)?.education
  )

  if (!hasData) {
    return (
      <Card className="border py-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            About
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setBioDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Oops!!!
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              You haven't added any info about you.
            </p>
          </div>
        </CardContent>
        <AddBioDialog />
      </Card>
    )
  }

  const bio = (applicant.extracted_profile as any)?.bio
  const skills = applicant.skills || []
  const education = (applicant.personal_info as any)?.education
  const personalInfo = (applicant.personal_info as any) || {}
  const jobPrefs = (applicant.job_preferences as any) || {}

  return (
    <div className="space-y-8 pb-10">
      {/* Top Section - Bio */}
      <section className="rounded-2xl bg-gray-50/50 p-8 dark:bg-zinc-900/50">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Bio</h2>
          <Button variant="ghost" size="sm" onClick={() => setBioDialogOpen(true)} className="text-gray-400 hover:text-gray-600">
            Edit
          </Button>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="mb-4 text-sm font-medium text-gray-400 dark:text-gray-500">Description</h3>
            <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400 max-w-5xl">
              {bio || "No description provided."}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="mb-6 text-sm font-medium text-gray-400 dark:text-gray-500">Tools</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-normal text-gray-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-400"
                >
                  {skill}
                </div>
              ))}
              {skills.length === 0 && <p className="text-sm text-gray-400">No tools listed</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section - Education & Awards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Educational Background */}
        <section className="rounded-2xl bg-gray-50/50 p-8 dark:bg-zinc-900/50">
          <h2 className="mb-8 text-base font-semibold text-gray-900 dark:text-white">Educational Background</h2>
          
          <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            {education ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 dark:text-gray-500">{education.institution}</p>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">{education.degree}</h4>
                  <p className="text-sm text-gray-400 dark:text-gray-500">{education.graduation_date}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                    Link
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                    Images <Link2 className="size-4" />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No educational background added.</p>
            )}
          </div>
        </section>

        {/* Award Section */}
        <section className="rounded-2xl bg-gray-50/50 p-8 dark:bg-zinc-900/50">
          <h2 className="mb-8 text-base font-semibold text-gray-900 dark:text-white">Award</h2>
          
          <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            {/* Using a placeholder since Award isn't in schema yet, or mapping from a plausible generic location */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-400 dark:text-gray-500">Hackathon Africa I Design</p>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">Best UI/UX Designer</h4>
                <p className="text-sm text-gray-400 dark:text-gray-500">June, 2025</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                  Link
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                  Images <Link2 className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Additional Detail sections in the same style */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-2xl bg-gray-50/50 p-8 dark:bg-zinc-900/50">
          <h2 className="mb-8 text-base font-semibold text-gray-900 dark:text-white">Personal Info</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{personalInfo.phone || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nationality</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{personalInfo.nationality || "N/A"}</p>
              </div>
              <div className="col-span-full space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Address</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {[personalInfo.address_city, personalInfo.address_country].filter(Boolean).join(", ") || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Preferences as a card */}
        <section className="rounded-2xl bg-gray-50/50 p-8 dark:bg-zinc-900/50">
          <h2 className="mb-8 text-base font-semibold text-gray-900 dark:text-white">Job Preferences</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Arrangement</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white uppercase">{jobPrefs.work_arrangement || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Notice Period</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{jobPrefs.notice_period || "N/A"}</p>
              </div>
              <div className="col-span-full space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Preferred Locations</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{jobPrefs.preferred_locations || "N/A"}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AddBioDialog />
    </div>
  )
}

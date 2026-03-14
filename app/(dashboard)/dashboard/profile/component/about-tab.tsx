"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicantProfile } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import {
  Github,
  Globe,
  Instagram,
  Link2,
  Linkedin,
  Twitter,
  MessageSquare,
  BriefcaseBusiness,
} from "lucide-react"
import Link from "next/link"
import { AddAwardDialog } from "./add-award-dialog"
import { AddEducationDialog } from "./add-education-dialog"
import { EditComplianceDialog } from "./edit-compliance-dialog"
import { EditJobPreferencesDialog } from "./edit-job-preferences-dialog"
import { EditPersonalInfoDialog } from "./edit-personal-info-dialog"
import { EditSocialLinksDialog } from "./edit-social-links-dialog"
import { ProfileSkeleton } from "./profile-skeleton"

/**
 * AboutTab component for the profile page.
 * Follows the high-fidelity UI layout provided in the attachment.
 */
export function AboutTab() {
  const {
    setSocialLinksDialogOpen,
    setPersonalInfoDialogOpen,
    setJobPreferencesDialogOpen,
    setComplianceDialogOpen,
    setEducationDialogOpen,
    setAwardDialogOpen,
  } = useProfileStore()
  const { applicant, isLoading } = useApplicantProfile()

  if (isLoading) {
    return <ProfileSkeleton />
  }

  // Check if there's any data
  // const hasData =
  //   applicant &&
  //   ((applicant.extracted_profile as any)?.bio ||
  //     (applicant.skills && applicant.skills.length > 0) ||
  //     (applicant.personal_info as any)?.education)

  // if (!hasData) {
  //   return (
  //     <Card className="border py-3">
  //       <CardHeader className="flex flex-row items-center justify-between space-y-0">
  //         <CardTitle className="text-base font-medium text-gray-900 dark:text-white">
  //           About
  //         </CardTitle>
  //         <Button variant="outline" onClick={() => setBioDialogOpen(true)}>
  //           <Plus className="size-4" />
  //           Add
  //         </Button>
  //       </CardHeader>
  //       <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center">
  //         <div className="space-y-2">
  //           <h3 className="text-base font-medium text-gray-900 dark:text-white">
  //             Oops!!!
  //           </h3>
  //           <p className="text-sm text-gray-400 dark:text-gray-500">
  //             You haven't added any info about you.
  //           </p>
  //         </div>
  //       </CardContent>
  //       <AddBioDialog />
  //     </Card>
  //   )
  // }

  if (!applicant) return null

  const education = (applicant.personal_info as Record<string, unknown>)
    ?.education as
    | { institution: string; degree: string; graduation_date: string }
    | undefined
  const personalInfo =
    (applicant.personal_info as Record<string, unknown>) || {}
  const jobPrefs = (applicant.job_preferences as Record<string, unknown>) || {}
  const complianceData =
    (applicant.compliance_data as Record<string, unknown>) || {}
  const socialLinks = applicant.social_links || {}

  return (
    <main className="flex flex-col gap-5">
      <Card className="bg-muted/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium text-gray-400 dark:text-gray-500">
            Personal Info
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPersonalInfoDialogOpen(true)}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(personalInfo).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-xs text-gray-400 capitalize">
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b(eu|uk|us)\b/gi, (m) => m.toUpperCase())}
                </p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : Array.isArray(value)
                      ? value
                          .map(
                            (v) =>
                              String(v).charAt(0).toUpperCase() +
                              String(v).slice(1).replace(/_/g, " ")
                          )
                          .join(", ")
                      : String(value || "N/A")
                          .charAt(0)
                          .toUpperCase() + String(value || "N/A").slice(1)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid Section - Education & Awards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Educational Background */}
        {/* Educational Background */}
        <Card className="col-span-1 bg-muted/50 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-gray-900 dark:text-white">
              Educational Background
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEducationDialogOpen(true)}
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            {education ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {education.institution}
                  </p>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {education.degree}
                  </h4>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {education.graduation_date}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                    Link
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                    Images <Link2 className="size-4" />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No educational background added.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Social Links Section */}
        <Card className="col-span-1 bg-muted/50 border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-gray-900 dark:text-white">
              Social Links
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSocialLinksDialogOpen(true)}
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { label: "LinkedIn", icon: Linkedin, url: socialLinks.linkedin_url },
              { label: "GitHub", icon: Github, url: socialLinks.github_url },
              { label: "X (Twitter)", icon: Twitter, url: socialLinks.x_url },
              { label: "Instagram", icon: Instagram, url: socialLinks.instagram_url },
              { label: "Reddit", icon: MessageSquare, url: socialLinks.reddit_url },
              { label: "Website", icon: Globe, url: socialLinks.website_url },
              { label: "Portfolio", icon: BriefcaseBusiness, url: socialLinks.portfolio_urls },
            ].map((social) => {
              const Icon = social.icon
              if (social.url) {
                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    className="w-full justify-start gap-5 bg-[#E6F9F6] text-[#00A78E] border-[#D1F2ED] hover:bg-[#D1F2ED] transition-colors"
                    asChild
                    size={'lg'}
                  >
                    <Link href={social.url} target="_blank">
                      <Icon className="size-4" />
                      {social.label}
                    </Link>
                  </Button>
                )
              }
              return (
                <Button
                  key={social.label}
                  variant="outline"
                  className="w-full justify-start gap-5 text-gray-400 cursor-not-allowed border-border dark:border-zinc-900"
                  disabled
                  size={'lg'}
                >
                  <Icon className="size-4" />
                  {social.label} (Not added)
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Additional Detail sections in the same style */}
      <div className="grid grid-cols-1 gap-4">
        {/* Job Preferences as a card */}
        <Card className="bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-gray-900 dark:text-white">
              Job Preferences
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJobPreferencesDialogOpen(true)}
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(jobPrefs).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-xs text-gray-400 capitalize">
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b(eu|uk|us)\b/gi, (m) => m.toUpperCase())}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : Array.isArray(value)
                        ? value
                            .map(
                              (v) =>
                                String(v).charAt(0).toUpperCase() +
                                String(v).slice(1).replace(/_/g, " ")
                            )
                            .join(", ")
                        : String(value || "N/A")
                            .charAt(0)
                            .toUpperCase() + String(value || "N/A").slice(1)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Data */}
      <div className="grid grid-cols-1 gap-4">
        {/* Compliance Data */}
        <Card className="bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-gray-900 dark:text-white">
              Compliance Data
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setComplianceDialogOpen(true)}
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              {Object.entries(complianceData).length > 0 ? (
                Object.entries(complianceData).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <p className="text-xs text-gray-400 capitalize">
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b(eu|uk|us)\b/gi, (m) => m.toUpperCase())}
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {typeof value === "boolean"
                        ? value
                          ? "Yes"
                          : "No"
                        : String(value).charAt(0).toUpperCase() +
                          String(value).slice(1)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No compliance data added.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <EditSocialLinksDialog />
      <EditPersonalInfoDialog />
      <EditJobPreferencesDialog />
      <EditComplianceDialog />
      <AddEducationDialog />
      <AddAwardDialog />
    </main>
  )
}

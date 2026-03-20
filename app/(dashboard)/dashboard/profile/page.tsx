"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApplicantProfile } from "@/hooks/use-queries"

import { cn } from "@/lib/utils"
import { Linkedin, MoreHorizontal, Share2, Twitter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AboutTab } from "./component/about-tab"
import { ExperienceTab } from "./component/experience-tab"
import { PreferencesTab } from "./component/preferences-tab"
import { ProjectsTab } from "./component/projects-tab"
import { ResumeDocsTab } from "./component/resume-docs-tab"

const tabs = [
  { label: "About", id: "about" },
  { label: "Preferences", id: "preferences" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Resume & Docs", id: "resume" },
]

export default function ProfilePage() {
  const { applicant } = useApplicantProfile()
  const [activeTab, setActiveTab] = useState("about")

  return (
    <main className="flex flex-col gap-5">
      {/* Profile Header Card */}
      <Card className="py-0">
        <CardContent className="py-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 gap-8">
              {/* Profile Picture */}
              <Avatar className="size-34 shrink-0 rounded-2xl border-2 border-white bg-gray-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <AvatarImage
                  src={applicant?.avatar_url ?? undefined}
                  alt={applicant?.full_name || "User"}
                  className="rounded-2xl object-cover"
                />
                <AvatarFallback className="flex items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-zinc-900 dark:text-gray-500">
                  <svg
                    className="size-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex flex-1 flex-col gap-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-semibold dark:text-zinc-50">
                      {applicant?.full_name || "N/A"}
                    </h1>
                    {applicant?.extracted_profile?.basic_profile?.seniority_level && (
                      <Badge variant="secondary" className="capitalize h-6 bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                        {applicant.extracted_profile.basic_profile.seniority_level}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      {applicant?.extracted_profile?.profile_summary?.headline || 
                       `${applicant?.extracted_profile?.basic_profile?.primary_role || applicant?.current_job_role || "Job Seeker"} at ${applicant?.extracted_profile?.basic_profile?.current_company || applicant?.current_company || "Focusing on career growth"}`}
                    </p>
                    <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {applicant?.extracted_profile?.profile_summary?.executive_summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    {applicant?.location || applicant?.extracted_profile?.availability_and_location?.current_location || "N/A"}
                  </span>
                  <span className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                  <span className="font-medium text-zinc-950 dark:text-zinc-50 cursor-pointer hover:underline">
                    Contact info
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Core Strengths - Highlighted style */}
                  {applicant?.extracted_profile?.profile_summary?.core_strengths?.map((strength) => (
                    <Badge
                      key={strength}
                      className="h-8 rounded px-3 border-indigo-100 bg-indigo-50 text-indigo-700 dark:border-indigo-900/30 dark:bg-indigo-900/40 dark:text-indigo-300"
                    >
                      {strength}
                    </Badge>
                  ))}
                  
                  {/* Top Skills */}
                  {(applicant?.extracted_profile?.skills || applicant?.skills)?.length ? (
                    (applicant?.extracted_profile?.skills || applicant?.skills)
                      .slice(0, 6)
                      .map((skill) => (
                        <Badge
                          key={skill}
                          className="h-8 rounded border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          {skill}
                        </Badge>
                      ))
                  ) : null}
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-col items-end gap-16">
              {/* Header Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" className="h-11 dark:border-zinc-800">
                  <Share2 className="size-5" />
                  Share profile
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 dark:border-zinc-800"
                >
                  <MoreHorizontal className="size-6" />
                </Button>
              </div>

              {/* Social Links moved here */}
              <div className="flex items-center gap-3">
                {applicant?.social_links?.x_url && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-lg border-gray-100 bg-gray-50/50 text-gray-600 transition-colors hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400 dark:hover:bg-zinc-800"
                    asChild
                  >
                    <Link
                      href={applicant.social_links.x_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="size-4" />
                    </Link>
                  </Button>
                )}
                {applicant?.social_links?.linkedin_url && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-lg border-gray-100 bg-gray-50/50 text-gray-600 transition-colors hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400 dark:hover:bg-zinc-800"
                    asChild
                  >
                    <Link
                      href={applicant.social_links.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="size-5" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        {/* Navigation Tabs */}
        <div className="border-t px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-[""]'
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* tabs content area */}
      <div className="min-h-screen flex-1 overflow-y-auto pb-10">
        {activeTab === "about" && <AboutTab />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "resume" && <ResumeDocsTab />}
        {activeTab === "preferences" && <PreferencesTab />}
        {activeTab === "projects" && <ProjectsTab />}
      </div>
    </main>
  )
}

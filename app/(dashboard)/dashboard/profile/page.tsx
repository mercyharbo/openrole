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
import { PreferencesTab } from "./component/preferences-tab"
import { ProjectsTab } from "./component/projects-tab"
import { ResumeDocsTab } from "./component/resume-docs-tab"

const tabs = [
  { label: "About", id: "about" },
  { label: "Preferences", id: "preferences" },
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
              <div className="flex flex-1 flex-col gap-4">
                <div className="space-y-1">
                  <h1 className="text-4xl font-semibold dark:text-zinc-50">
                    {applicant?.full_name || "N/A"}
                  </h1>
                  <p className="max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {applicant?.current_job_role || "Job Seeker"} |{" "}
                    {applicant?.current_company || "Looking for opportunities"}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span>{applicant?.location || "N/A"}</span>
                  <span className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    Contact info
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {applicant?.skills && applicant.skills.length > 0 ? (
                    applicant.skills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        className="h-8 rounded border-amber-900/30 bg-amber-900/40 text-amber-300"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No skills listed
                    </p>
                  )}
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
        {activeTab === "resume" && <ResumeDocsTab />}
        {activeTab === "preferences" && <PreferencesTab />}
        {activeTab === "projects" && <ProjectsTab />}
      </div>
    </main>
  )
}

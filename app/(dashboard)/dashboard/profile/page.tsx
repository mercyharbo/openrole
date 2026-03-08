"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { cn } from "@/lib/utils"
import { Linkedin, MoreHorizontal, Plus, Share2, Twitter } from "lucide-react"
import * as React from "react"
import { AddAwardDialog } from "./component/add-award-dialog"
import { AddBioDialog } from "./component/add-bio-dialog"
import { AddCertificationDialog } from "./component/add-certification-dialog"
import { AddEducationDialog } from "./component/add-education-dialog"
import { AddSkillsDialog } from "./component/add-skills-dialog"
import { ExperienceTab } from "./component/experience-tab"

const tabs = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
]

export default function ProfilePage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = React.useState("about")

  const {
    setBioDialogOpen,
    setSkillsDialogOpen,
    setEducationDialogOpen,
    setCertificationDialogOpen,
    setAwardDialogOpen,
  } = useProfileStore()

  return (
    <main className="flex flex-col gap-5">
      {/* Profile Header Card */}
      <Card className="py-0">
        <CardContent className="py-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-8">
              {/* Profile Picture */}
              <Avatar className="size-34 shrink-0 rounded-2xl border-2 border-white bg-gray-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <AvatarImage
                  src={user?.avatar_url ?? undefined}
                  alt={user?.full_name || "User"}
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
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <h1 className="text-4xl font-semibold dark:text-white">
                    {user?.full_name || "N/A"}
                  </h1>
                  <p className="max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    Prayer Warrior | Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Nigeria</span>
                  <span className="size-1 rounded-full bg-gray-300 dark:bg-zinc-800" />
                  <span className="font-semibold text-black dark:text-white">
                    Contact info
                  </span>
                </div>

                <div className="flex w-full flex-wrap items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Badge className="h-8 rounded border-[#FDECCE] bg-[#FEFAF3] text-[#F59E0B]">
                      Evangelism
                    </Badge>
                    <Badge className="h-8 rounded border-[#FDECCE] bg-[#FEFAF3] text-[#F59E0B]">
                      Teacher
                    </Badge>
                    <Badge className="h-8 rounded border-[#FDECCE] bg-[#FEFAF3] text-[#F59E0B]">
                      Writer
                    </Badge>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-9 rounded-lg border-gray-100 bg-gray-50/50 text-gray-600 transition-colors hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400 dark:hover:bg-zinc-800"
                    >
                      <Twitter className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-9 rounded-lg border-gray-100 bg-gray-50/50 text-gray-600 transition-colors hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400 dark:hover:bg-zinc-800"
                    >
                      <Linkedin className="size-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

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
                    : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* About Tab Content */}
      {activeTab === "about" && (
        <Card className="py-5">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-5">
            {/* Bio and Skills (Larger cards or specific layout) */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1 border-2 border-dashed lg:col-span-2">
                <CardContent className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-0 text-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      Bio
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      Tell employers a little about yourself.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => setBioDialogOpen(true)}
                  >
                    <Plus className="size-4" />
                    Add bio
                  </Button>
                </CardContent>
              </Card>

              <Card className="col-span-1 border-2 border-dashed">
                <CardContent className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-0 text-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      Skills
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      Show the skills you're best at.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => setSkillsDialogOpen(true)}
                  >
                    <Plus className="size-4" />
                    Add skills
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Card className="col-span-1 border-2 border-dashed">
                <CardContent className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-0 text-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      Education
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      Showcase your academic background.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => setEducationDialogOpen(true)}
                  >
                    <Plus className="size-4" />
                    Add education
                  </Button>
                </CardContent>
              </Card>{" "}
              <Card className="col-span-1 border-2 border-dashed">
                <CardContent className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-0 text-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      Certifications
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      Showcase your professional certifications.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => setCertificationDialogOpen(true)}
                  >
                    <Plus className="size-4" />
                    Add certifications
                  </Button>
                </CardContent>
              </Card>
              <Card className="col-span-1 border-2 border-dashed">
                <CardContent className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-0 text-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      Awards
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      Highlight your achievement.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => setAwardDialogOpen(true)}
                  >
                    <Plus className="size-4" />
                    Add awards
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* experience tab */}
      {activeTab === "experience" && <ExperienceTab />}

      {/* Dialogs */}
      <AddBioDialog /> 
      <AddSkillsDialog />
      <AddEducationDialog />
      <AddCertificationDialog />
      <AddAwardDialog />
    </main>
  )
}

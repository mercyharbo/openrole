"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Briefcase, Clock, MapPin } from "lucide-react"
import NextImage from "next/image"
import { useState } from "react"

const tabs = [
  { label: "Pending", id: "pending" },
  { label: "Approved", id: "approved" },
  { label: "Rejected", id: "rejected" },
]

const mockApplications = [
  {
    id: "1",
    title: "Product Designer",
    company: "Finnovate",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Finnovate",
    location: "Remote",
    salary: "$70k - $90k",
    type: "Full-time",
    description:
      "As a Product Designer, you will play a key role in shaping the user experience and visual identity of our products. Working closely with cross-functional teams, you will be responsible for designing intuitive and engaging interfaces that reflect our brand and...",
    appliedAt: "2024-10-22", // 7 days ago if today is 2024-10-29
    status: "pending",
  },
  {
    id: "2",
    title: "Senior UX Researcher",
    company: "TechFlow",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TechFlow",
    location: "Hybrid / London",
    salary: "$90k - $120k",
    type: "Full-time",
    description:
      "We are looking for a Senior UX Researcher to join our growing design team. You will lead research initiatives, conduct user testing, and provide actionable insights that drive product strategy and user-centric design decisions.",
    appliedAt: "2024-10-25",
    status: "pending",
  },
]

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("pending")

  const filteredApplications = mockApplications.filter(
    (app) => app.status === activeTab
  )

  return (
    <main className="flex flex-col gap-5">
      {/* Applications Header Card */}
      <Card className="py-0">
        <CardContent className="px-8 py-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold dark:text-white">
              My Applications
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View and manage your job applications.
            </p>
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

      {/* Tabs Content area */}
      <div className="flex-1 pb-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <Card key={app.id} className="bg-muted/50">
                <CardContent className="flex flex-col gap-6">
                  {/* Company Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-50 bg-white p-2">
                      {app.logo ? (
                        <NextImage
                          src={app.logo}
                          alt={app.company}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      ) : (
                        <Briefcase className="size-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base leading-none font-semibold text-gray-900 dark:text-white">
                        {app.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {app.company}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-white/50 px-3 py-2 text-xs text-gray-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400">
                      <MapPin className="size-4" />
                      {app.location}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-white/50 px-3 py-2 text-xs text-gray-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400">
                      {app.salary}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-white/50 px-3 py-2 text-xs text-gray-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400">
                      {app.type}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {app.description}
                  </p>

                  <div className="flex flex-col gap-5">
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                      Applied: 7 days ago
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 font-medium text-[#EAB308]">
                        <Clock className="size-5" />
                        <span className="capitalize">{app.status}</span>
                      </div>
                      <Button
                        size={"lg"}
                        className="min-w-[160px] px-8 text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardHeader className="text-center font-medium">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-col items-center gap-3 py-20 text-center text-gray-400">
                <Briefcase className="mb-2 size-12 opacity-20" />
                <p>No {activeTab} applications found.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}

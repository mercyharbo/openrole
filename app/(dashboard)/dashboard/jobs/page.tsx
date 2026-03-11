"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn, formatRelativeTime } from "@/lib/utils"
import { Briefcase } from "lucide-react"

import { useJobs } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { ViewApplicationDialog } from "./components/view-application-dialog"

const stats = [
  { label: "Best Matches", active: true },
  { label: "Most Recent", active: false },
  { label: "Saved", active: false },
]

/**
 * Dashboard Overview page.
 * Displays job matches and pending applications.
 */
export default function OverviewPage() {
  const { jobs } = useJobs()
  const { isViewApplicationDialogOpen, setViewApplicationDialogOpen } =
    useProfileStore()

  return (
    <main className="flex flex-col gap-8">
      {/* Jobs Section */}
      <Card className="px-0 py-0">
        <CardHeader className="flex flex-col gap-1 p-5">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Jobs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Discover roles that match your profile.
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="flex gap-8 px-5">
          {stats.map((stat) => (
            <button
              key={stat.label}
              className={cn(
                "relative pb-4 text-sm font-semibold transition-colors",
                stat.active
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-[""]'
                  : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              )}
            >
              {stat.label}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Pending Applications Section */}
      <Card className="px-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Pending Applications
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="3xl:grid-cols-3 grid grid-cols-1 gap-6 pt-6 xl:grid-cols-2">
          {!jobs || jobs.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">
              No pending applications found.
            </div>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="flex flex-col gap-5 bg-muted p-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex size-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
                      <Briefcase className="size-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-950 dark:text-white">
                          {job.title}
                        </h3>
                        {job.is_active && (
                          <Badge
                            variant="secondary"
                            className="bg-status-cyan/10 text-status-cyan border-status-cyan h-6 rounded border"
                          >
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {job.industry}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-orange-400">
                    {/* Placeholder for match percentage if not in API */}
                    65%
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 rounded-md border-gray-200 px-2.5 py-1 font-semibold text-black dark:border-zinc-800 dark:text-white"
                  >
                    <Briefcase className="size-3.5" />
                    {job.location_preference}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-md border-gray-200 px-2.5 py-1 font-semibold text-black dark:border-zinc-800 dark:text-white"
                  >
                    ${job.years_experience_min}k - ${job.years_experience_max}k
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-md border-gray-200 px-2.5 py-1 font-semibold text-black dark:border-zinc-800 dark:text-white"
                  >
                    {job.seniority}
                  </Badge>
                </div>

                <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-700">
                  {job.raw_description}
                </p>

                <div className="flex flex-col gap-4">
                  <p className="text-xs text-gray-600">
                    Applied: {formatRelativeTime(job.created_at)}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-11 border-gray-400! font-semibold dark:border-zinc-800!"
                    >
                      Job description
                    </Button>
                    <Button
                      onClick={() => setViewApplicationDialogOpen(true)}
                      className="h-11 font-semibold dark:text-white"
                    >
                      View application
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      <ViewApplicationDialog
        isOpen={isViewApplicationDialogOpen}
        onOpenChange={setViewApplicationDialogOpen}
      />
    </main>
  )
}

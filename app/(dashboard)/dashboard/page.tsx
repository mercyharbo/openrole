"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useApplicantProfile, useAutoApplyStats } from "@/hooks/use-queries"

import {
  Briefcase,
  CheckCircle2,
  Activity,
  Zap,
} from "lucide-react"
import Link from "next/link"

/**
 * Dashboard Overview page.
 * Displays key metrics and pending applications.
 */
export default function OverviewPage() {
  useApplicantProfile()
  const { stats } = useAutoApplyStats()

  const liveMetrics = [
    {
      title: "Total Application",
      value: stats?.total_applications?.toString().padStart(2, '0') ?? "00",
      icon: Briefcase,
    },
    {
      title: "Successful",
      value: stats?.successful?.toString().padStart(2, '0') ?? "00",
      icon: CheckCircle2,
    },
    {
      title: "Today's",
      value: stats?.today_count?.toString().padStart(2, '0') ?? "00",
      icon: Activity,
    },
    {
      title: "Daily Limit",
      value: stats?.daily_limit?.toString().padStart(2, '0') ?? "00",
      icon: Zap,
    },
  ]

  return (
    <main className="flex flex-col gap-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {liveMetrics.map((metric) => (
          <Card key={metric.title} className="">
            <CardHeader className="flex items-center justify-between pb-0">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                {metric.title}
              </CardTitle>
              <CardAction>
                <div className="flex size-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-primary dark:border-zinc-800 dark:bg-zinc-900">
                  <metric.icon size={20} />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <h1 className="text-4xl font-bold">{metric.value}</h1>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-50 text-gray-400 dark:bg-zinc-900">
              <Briefcase size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No applications yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start exploring jobs to see your application history here.</p>
            <Button className="mt-8 gap-2" asChild>
              <Link href="/dashboard/jobs">Explore Jobs</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Profile Completion or Suggested Jobs */}
        <Card className="h-full min-h-[400px] lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Profile Status</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800">
                    <div className="h-full w-[35%] rounded-full bg-primary" />
                  </div>
                </div>
                <p className="text-sm text-gray-500">Complete your profile to increase your chances of getting hired by 5x.</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/profile">Edit Profile</Link>
                </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

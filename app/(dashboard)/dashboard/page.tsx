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
import { OverviewSkeleton } from "@/components/dashboard/overview-skeleton"

/**
 * Dashboard Overview page.
 * Displays key metrics and pending applications.
 */
export default function OverviewPage() {
  const { isLoading: isProfileLoading } = useApplicantProfile()
  const { stats, isLoading: isStatsLoading } = useAutoApplyStats()

  if (isProfileLoading || isStatsLoading) {
    return <OverviewSkeleton />
  }

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
      {/* Coming Soon Section */}
      <Card className="flex min-h-[400px] flex-col items-center justify-center border-dashed border-gray-200 bg-gray-50/30 text-center dark:border-zinc-800 dark:bg-zinc-900/10">
        <div className="mb-4 flex size-20 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-zinc-900">
          <Zap size={40} className="animate-pulse text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Coming Soon</h2>
        <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
          We're working on something amazing! Your application history and 
          suggested jobs will be available here very soon.
        </p>
      </Card>
    </main>
  )
}

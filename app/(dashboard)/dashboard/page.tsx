"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRecruiterDashboard, useRecruiterProfile } from "@/hooks/use-queries"
import {
  Briefcase,
  Calendar,
  Inbox,
  MoreHorizontal,
  Plus,
  UserPlus,
  Users,
} from "lucide-react"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartData = [
  { day: "Sun", value: 180 },
  { day: "Mon", value: 60 },
  { day: "Tue", value: 230 },
  { day: "Wed", value: 100 },
  { day: "Thu", value: 190 },
  { day: "Fri", value: 270 },
  { day: "Sat", value: 220 },
]

const chartConfig = {
  value: {
    label: "Applications",
    color: "#0097FB",
  },
} satisfies ChartConfig

/**
 * Dashboard Overview page.
 * Displays key metrics and pending applications.
 */
export default function OverviewPage() {
  const { dashboardData } = useRecruiterDashboard()
  const { recruiterProfile } = useRecruiterProfile()

  console.log("Recruiter Dashboard Data:", dashboardData)
  console.log("Recruiter Profile:", recruiterProfile)

  const formatValue = (val: number | undefined) => {
    if (val === undefined || val === 0) return "0"
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + "k"
    }
    return val.toString().padStart(2, "0")
  }

  const liveMetrics = [
    {
      title: "Total Jobs",
      value: formatValue(dashboardData?.active_jobs),
      icon: Briefcase,
    },
    {
      title: "Open Jobs",
      value: formatValue(dashboardData?.pending),
      icon: Inbox,
    },
    {
      title: "Total Applicants",
      value: formatValue(dashboardData?.total_applications),
      icon: Users,
    },
    {
      title: "Total Shortlisted",
      value: formatValue(dashboardData?.shortlisted),
      icon: UserPlus,
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

      {/* Insight Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Application Insight Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between pb-8">
            <CardTitle className="text-lg">Application Insight</CardTitle>
            <CardAction className="flex items-center gap-3">
              <Select defaultValue="7d">
                <SelectTrigger
                  size="default"
                  className="h-9 min-w-[130px] gap-2 border-gray-200 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <Calendar size={16} />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="size-9 border-gray-200 text-gray-400 dark:border-zinc-800 dark:text-gray-500"
              >
                <MoreHorizontal size={20} />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-6">
              {/* Chart Implementation using Shadcn/Recharts */}
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart
                  data={chartData}
                  margin={{ top: 0, right: 10, left: -20, bottom: 10 }}
                  barSize={16}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--gray-50)"
                    strokeDasharray="0"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 13 }}
                    dy={16}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 13 }}
                    ticks={[0, 100, 200, 300, 400]}
                    domain={[0, 400]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-value)"
                    radius={[10, 10, 10, 10]}
                    background={{ fill: "#F9FAFB", radius: 10 }}
                  />
                </BarChart>
              </ChartContainer>

              {/* Chart Date Range Footer */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-gray-100 dark:bg-zinc-800" />
                <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                  Feb 26 - Mar 4
                </span>
                <div className="h-px flex-1 bg-gray-100 dark:bg-zinc-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty Placeholder Card */}
        <Card className="h-full min-h-[400px] lg:col-span-1" />
      </div>

      {/* New Job Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-normal">New Job</CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 py-12 dark:border-zinc-800">
            <p className="text-gray-500 dark:text-gray-400">Create a new job</p>
            <Button
              variant="outline"
              className="gap-2 px-6 py-5 dark:border-zinc-800"
            >
              <Plus size={16} />
              Create job
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

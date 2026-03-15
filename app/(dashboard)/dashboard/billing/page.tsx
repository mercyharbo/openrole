"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useBillingBalance,
  useBillingHistory,
  useBillingSubscription,
} from "@/hooks/use-queries"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  ArrowDownLeft,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Coins,
  CreditCard,
  History,
  Zap,
} from "lucide-react"

export default function BillingPage() {
  const { balance, isLoading: isBalanceLoading } = useBillingBalance()
  const { subscription, isLoading: isSubLoading } = useBillingSubscription()
  const { history, isLoading: isHistoryLoading } = useBillingHistory()

  const metrics = [
    {
      title: "Applications Remaining",
      value: balance?.applications_remaining?.toString() ?? "0",
      icon: Briefcase,
      color: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-900/30",
    },
    {
      title: "Credits Remaining",
      value: balance?.credits_remaining?.toString() ?? "0",
      icon: Coins,
      color: "text-amber-700 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-900/30",
    },
    {
      title: "Applications Used",
      value: balance?.applications_used_this_period?.toString() ?? "0",
      icon: History,
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-100 dark:border-green-900/30",
    },
    {
      title: "Credits Used",
      value: balance?.credits_used_this_period?.toString() ?? "0",
      icon: Zap,
      color: "text-purple-700 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-100 dark:border-purple-900/30",
    },
  ]

  const isLoading = isBalanceLoading || isSubLoading

  if (isLoading) {
    return (
      <main className="flex flex-col gap-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-10 rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <Separator />
          <CardContent className="p-6">
            <div className="flex flex-col gap-8 md:flex-row">
              <Skeleton className="h-40 w-full rounded-xl md:w-1/3" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-8 bg-white dark:bg-zinc-950">
      <div>
        <h1 className="text-xl font-medium text-zinc-950 dark:text-zinc-50">
          Billing & Usage
        </h1>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
          Manage your credits and monitor your application usage.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className="border-zinc-200 transition-all duration-300 hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {metric.title}
              </CardTitle>
              <div
                className={`flex size-10 items-center justify-center rounded-lg border ${metric.border} ${metric.bg} ${metric.color}`}
              >
                <metric.icon size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">
                {metric.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Plan Section */}
      <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-zinc-950 dark:text-zinc-50">
            <CreditCard className="size-5 text-primary" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Plan Highlight */}
            <div className="flex flex-col items-center justify-center border-r border-zinc-200 p-8 text-center md:min-w-[280px] dark:border-zinc-800">
              <span className="mb-2 text-xs font-medium text-primary uppercase">
                Current Plan
              </span>
              <h3 className="mb-1 text-4xl font-bold text-zinc-950 dark:text-zinc-50">
                {subscription?.plan.name || "Free Trial"}
              </h3>
              <p className="text-sm font-medium text-zinc-700 capitalize dark:text-zinc-400">
                {subscription?.plan.billing_period} billing
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-zinc-950 dark:text-zinc-50">
                  ${((subscription?.plan.price_cents ?? 0) / 100).toFixed(2)}
                </span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
                  /mo
                </span>
              </div>
            </div>

            {/* Plan Details */}
            <div className="flex-1 p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      Plan Benefits
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-200">
                        <CheckCircle2 className="size-4 text-green-700 dark:text-green-400" />
                        {subscription?.plan.applications_per_month.toLocaleString()}{" "}
                        applications per month
                      </li>
                      <li className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-200">
                        <CheckCircle2 className="size-4 text-green-700 dark:text-green-400" />
                        {subscription?.plan.credits_per_month.toLocaleString()}{" "}
                        AI credits included
                      </li>
                      <li className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-200">
                        <CheckCircle2 className="size-4 text-green-700 dark:text-green-400" />
                        Standard job board integrations
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      Subscription Info
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-gray-100 p-2 font-medium dark:bg-zinc-800">
                          <Calendar className="size-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700 uppercase dark:text-zinc-400">
                            Next Renewal
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
                            {subscription?.current_period_end
                              ? format(
                                  new Date(subscription.current_period_end),
                                  "MMMM dd, yyyy"
                                )
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-gray-100 p-2 dark:bg-zinc-800">
                          <CheckCircle2 className="size-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700 uppercase dark:text-zinc-400">
                            Status
                          </p>
                          <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-900 capitalize dark:bg-green-900/40 dark:text-green-300">
                            {subscription?.status || "Active"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History Section */}
      <Card className="border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-zinc-950 dark:text-zinc-50">
            <History className="size-5 text-primary" />
            Billing History
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          {isHistoryLoading ? (
            <div className="space-y-4 p-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : history.length > 0 ? (
            <div className="rounded-md border-none">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Apps/Credits</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((item) => (
                    <TableRow
                      key={item.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "rounded-md p-1.5",
                              item.amount_cents > 0
                                ? "bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400"
                                : "bg-green-50 text-green-600 dark:bg-green-900/10 dark:text-green-400"
                            )}
                          >
                            {item.amount_cents > 0 ? (
                              <ArrowUpRight className="size-3.5" />
                            ) : (
                              <ArrowDownLeft className="size-3.5" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-zinc-950 capitalize dark:text-zinc-50">
                            {item.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="truncate text-sm font-medium text-zinc-950 dark:text-zinc-50">
                          {item.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            item.amount_cents > 0
                              ? "text-zinc-950 dark:text-zinc-50"
                              : "text-green-700 dark:text-green-400"
                          )}
                        >
                          {item.amount_cents > 0
                            ? `$${((item.amount_cents ?? 0) / 100).toFixed(2)}`
                            : "Free"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          {item.applications_delta !== 0 && (
                            <span
                              className={cn(
                                "text-sm font-medium",
                                item.applications_delta > 0
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-red-700 dark:text-red-400"
                              )}
                            >
                              {item.applications_delta > 0 ? "+" : ""}
                              {item.applications_delta} Apps
                            </span>
                          )}
                          {item.credits_delta !== 0 && (
                            <span
                              className={cn(
                                "text-sm font-medium",
                                item.credits_delta > 0
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-red-700 dark:text-red-400"
                              )}
                            >
                              {item.credits_delta > 0 ? "+" : ""}
                              {item.credits_delta} Credits
                            </span>
                          )}
                          {item.applications_delta === 0 &&
                            item.credits_delta === 0 && (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium text-gray-700 dark:text-zinc-300">
                        {format(new Date(item.created_at || new Date()), "MMM dd, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 py-20 text-center">
              <History className="size-12 text-gray-300 opacity-20" />
              <p className="text-sm text-gray-500">No transactions found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

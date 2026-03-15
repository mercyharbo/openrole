"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { useAutoApplyApplications } from "@/hooks/use-queries"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import {
  Activity,
  Briefcase,
  Clock,
  SlidersHorizontal,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ApplicationsLoadingSkeleton } from "./_components/loading-skeleton"

const statusMapping: Record<string, string> = {
  pending: "pending",
  approved: "success",
  rejected: "failed",
}

const tabs = [
  { label: "Successful", id: "approved" },
  { label: "Pending", id: "pending" },
]

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("approved")
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  const { applications, isLoading } = useAutoApplyApplications()

  const filteredApplications =
    applications?.filter((app) => app.status === statusMapping[activeTab]) ?? []

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Reset page when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setCurrentPage(1)
  }

  if (isLoading) {
    return <ApplicationsLoadingSkeleton />
  }

  return (
    <main className="flex flex-col gap-5">
      {/* Applications Header Card */}
      <Card className="py-0">
        <CardContent className="px-8 py-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium text-zinc-950 dark:text-zinc-50">
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
                onClick={() => handleTabChange(tab.id)}
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
      <Card className="flex-1 gap-5 pb-10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{tabs.find((t) => t.id === activeTab)?.label}</CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {paginatedApplications.length > 0 ? (
            paginatedApplications.map((app) => (
              <Card key={app.id} className="bg-muted/50 transition-all duration-300 hover:bg-white hover:shad-sm hover:-translate-y-1 dark:hover:bg-zinc-900/50">
                <CardContent className="flex flex-col gap-6">
                  {/* Company Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white p-2">
                      <div className="flex size-full items-center justify-center rounded bg-primary/10 text-xl font-bold text-primary">
                        {app.company.charAt(0)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base leading-none font-medium text-zinc-950 dark:text-zinc-50">
                        {app.job_title}
                      </h3>
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {app.company}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 dark:border-amber-900/30 dark:bg-amber-900/40 dark:text-amber-300">
                      <Star className="size-4 fill-amber-500 text-amber-500" />
                      Match Score: {app.match_score}%
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                      <Clock className="size-4" />
                      Applied:{" "}
                      {formatDistanceToNow(new Date(app.applied_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>

                  {/* Description - AI Match Reason */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-600 capitalize dark:text-zinc-400">
                      AI Match Reason
                    </p>
                    <p className="line-clamp-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {app.ai_match_reason || "No match reason provided."}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-4">
                      <div
                        className={cn(
                          "flex items-center gap-2 font-medium capitalize",
                          app.status === "successful"
                            ? "text-green-600 dark:text-green-400"
                            : app.status === "failed"
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                        )}
                      >
                        {app.status === "successful" ? (
                          <Activity className="size-5" />
                        ) : (
                          <Clock className="size-5" />
                        )}
                        <span>{app.status}</span>
                      </div>
                      <Button
                        size={"lg"}
                        className="min-w-[160px] bg-[#172554] px-8 font-medium text-white hover:bg-blue-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                        asChild
                      >
                        <Link href={app.job_url} target="_blank">
                          View Job
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full mx-auto flex max-w-md flex-col items-center justify-center gap-3 py-20 text-center text-gray-400">
              <Briefcase className="mb-2 size-12 opacity-20" />
              <p>
                No {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}{" "}
                applications found.
              </p>
            </div>
          )}
        </CardContent>

        {totalPages > 1 && (
          <CardHeader className="pt-0">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardHeader>
        )}
      </Card>
    </main>
  )
}

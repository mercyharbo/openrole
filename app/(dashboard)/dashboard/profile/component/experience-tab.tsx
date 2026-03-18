"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useApplicantProfile } from "@/hooks/use-queries"
import { Edit2, Plus } from "lucide-react"
import { ProfileSkeleton } from "./profile-skeleton"

/**
 * ExperienceTab component for the profile page.
 * Renders professional experience cards following the high-fidelity UI layout.
 */
export function ExperienceTab() {
  const { applicant, isLoading } = useApplicantProfile()

  if (isLoading) {
    return <ProfileSkeleton />
  }

  const experiences = applicant?.extracted_profile?.professional_experience || []

  if (experiences.length === 0) {
    return (
      <Card className="border-0 bg-muted/50 shadow-none">
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-lg font-semibold">No Experience Found</h3>
          <p className="text-muted-foreground">
            You haven&apos;t added any work experience yet.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 size-4" /> Add Experience
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getBadgeStyles = (index: number) => {
    const styles = [
      "bg-cyan-100 text-cyan-700 hover:bg-cyan-100 border-transparent dark:bg-cyan-900/30 dark:text-cyan-300",
      "bg-slate-700 text-white hover:bg-slate-700 border-transparent dark:bg-slate-800 dark:text-zinc-200",
      "bg-zinc-100 text-zinc-700 hover:bg-zinc-100 border-transparent dark:bg-zinc-800 dark:text-zinc-300",
      "bg-orange-50 text-orange-600 hover:bg-orange-50 border-transparent dark:bg-orange-900/20 dark:text-orange-300",
    ]
    return styles[index % styles.length]
  }

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="">Work Experience</CardTitle>
        <Button variant="outline" size="sm" className="h-9 px-4">
          <Plus className="mr-2 size-4" /> Add
        </Button>
      </CardHeader>
      <Separator className="" />
      <CardContent className="">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {experiences.map((exp, idx) => (
            <Card
              key={idx}
              className="relative overflow-hidden border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5 pb-2">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {exp.company || "N/A"}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {exp.role || "N/A"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  <Edit2 className="mr-1.5 size-3" /> Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
                  {exp.start_date || "Start"} -{" "}
                  {exp.end_date || (exp.is_current ? "Present" : "End")} |{" "}
                  {exp.location || exp.remote_type || "Remote"}{" "}
                  {exp.employment_type ? `| ${exp.employment_type}` : ""}
                </p>

                {exp.summary && (
                  <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {exp.summary}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.technologies_used?.slice(0, 5).map((tech, techIdx) => (
                    <Badge
                      key={techIdx}
                      className={`h-7 rounded px-3 py-0 text-xs font-medium ${getBadgeStyles(techIdx)}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                  {exp.technologies_used &&
                    exp.technologies_used.length > 5 && (
                      <Badge
                        variant="secondary"
                        className="h-7 rounded bg-zinc-100 px-2 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        +{exp.technologies_used.length - 5}
                      </Badge>
                    )}
                </div>

                <Button
                  variant="outline"
                  className="h-10 w-full rounded-lg border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useProfileStore } from "@/lib/store/profile-store"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

/**
 * AboutTab component for the profile page.
 * Displays empty state cards for Bio, Skills, Education, Certifications, and Awards.
 */
export function AboutTab() {
  const {
    bioForm,
    setBioDialogOpen,
    setSkillsDialogOpen,
    setEducationDialogOpen,
    setCertificationDialogOpen,
    setAwardDialogOpen,
  } = useProfileStore()

  return (
    <Card className="py-5">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">About</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-5 pt-6">
        {/* Bio and Skills (Larger cards or specific layout) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card
            className={cn(
              "col-span-1 border-dashed lg:col-span-2",
              !bioForm.about && "border-2 border-dashed"
            )}
          >
            <CardContent
              className={cn(
                "p-6",
                !bioForm.about &&
                  "flex min-h-[280px] flex-col items-center justify-center gap-3 p-0 text-center"
              )}
            >
              {!bioForm.about ? (
                <>
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
                    size="lg"
                    className="gap-2 px-6"
                    onClick={() => setBioDialogOpen(true)}
                  >
                    <Plus className="size-4" />
                    Add bio
                  </Button>
                </>
              ) : (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Bio
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Description
                    </h4>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-gray-500 dark:text-gray-400">
                      {bioForm.about}
                    </p>
                  </div>

                  {bioForm.featuredSkills.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {bioForm.featuredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center rounded-md border border-gray-100 bg-gray-50/50 px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-gray-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                size="lg"
                className="gap-2 px-6"
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
                size="lg"
                className="gap-2 px-6"
                onClick={() => setEducationDialogOpen(true)}
              >
                <Plus className="size-4" />
                Add education
              </Button>
            </CardContent>
          </Card>

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
                size="lg"
                className="gap-2 px-6"
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
                size="lg"
                className="gap-2 px-6"
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
  )
}

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useProfileStore } from "@/lib/store/profile-store"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

import NextImage from "next/image"

/**
 * ProjectsTab component for the profile page.
 * Displays project entries or an empty state if none exists.
 */
export function ProjectsTab() {
  const { projects, setProjectsDialogOpen } = useProfileStore()

  const isEmpty = projects.length === 0

  return (
    <Card className="py-5">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">Projects</CardTitle>
        <CardAction>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-gray-200 px-6"
            onClick={() => setProjectsDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add project
          </Button>
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent
        className={cn(
          "py-6",
          isEmpty &&
            "flex min-h-[400px] flex-col items-center justify-center gap-2 text-center"
        )}
      >
        {isEmpty ? (
          <>
            <h3 className="text-lg text-black dark:text-white">Oops!!!</h3>
            <p className="text-gray-400 dark:text-gray-500">
              You haven't added any projects to your profile yet.
            </p>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800">
                  {project.image ? (
                    <NextImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 px-1">
                  <div className="inline-flex w-fit rounded-lg bg-gray-50 px-4 py-2 text-[15px] font-medium text-gray-900 dark:bg-zinc-800 dark:text-gray-200">
                    {project.title}
                  </div>
                  <p className="line-clamp-3 text-[14.5px] leading-relaxed text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>

                <div className="px-1">
                  <Button
                    variant="outline"
                    className="h-11 w-full border-gray-200 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-800"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

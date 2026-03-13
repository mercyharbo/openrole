"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Experience, useProfileStore } from "@/lib/store/profile-store"
import { cn } from "@/lib/utils"
import { Pencil, Plus } from "lucide-react"
import { AddExperienceDialog } from "./add-experience-dialog"

/**
 * ExperienceTab component for the profile page.
 * Displays work experience or an empty state if none exists.
 */
const DUMMY_EXPERIENCES: Experience[] = [
  {
    id: "dummy-1",
    company: "Focus Peer",
    role: "UI / UX Designer",
    startDate: "January, 2025",
    endDate: "December, 2025",
    isCurrent: false,
    location: "Nigeria",
    locationType: "Remote",
    employmentType: "Full-time",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 15...",
    skills: ["User Interface", "Prototyping", "Wireframing"],
    tools: ["Figma", "Sketch"],
    isCollapsed: false,
  },
  {
    id: "dummy-2",
    company: "Focus Peer",
    role: "UI/UX Designer",
    startDate: "January, 2025",
    endDate: "December, 2025",
    isCurrent: false,
    location: "Nigeria",
    locationType: "Remote",
    employmentType: "Contract",
    details: "",
    skills: ["User Interface", "Figma", "Prototyping", "Wireframing"],
    tools: ["Sketch"],
    isCollapsed: false,
  },
  {
    id: "dummy-3",
    company: "Focus Peer",
    role: "UI/UX Designer",
    startDate: "January, 2025",
    endDate: "December, 2025",
    isCurrent: false,
    location: "Nigeria",
    locationType: "Remote",
    employmentType: "Full-time",
    details: "",
    skills: ["User Interface", "Figma", "Prototyping", "Wireframing"],
    tools: ["Sketch"],
    isCollapsed: false,
  },
  {
    id: "dummy-4",
    company: "Focus Peer",
    role: "UI/UX Designer",
    startDate: "January, 2025",
    endDate: "December, 2025",
    isCurrent: false,
    location: "Nigeria",
    locationType: "Remote",
    employmentType: "Contract",
    details: "",
    skills: ["User Interface", "Figma", "Prototyping", "Wireframing"],
    tools: ["Sketch"],
    isCollapsed: false,
  },
]

export function ExperienceTab() {
  const { experiences, setExperienceDialogOpen } = useProfileStore()

  // Filter out the initial empty experience if it hasn't been filled
  const activeExperiencesFromStore = experiences.filter(
    (exp) => exp.company.trim() !== "" || exp.role.trim() !== ""
  )

  // Use dummy data if the store is empty so the user can see the UI
  const activeExperiences =
    activeExperiencesFromStore.length > 0
      ? activeExperiencesFromStore
      : DUMMY_EXPERIENCES

  if (
    activeExperiencesFromStore.length === 0 &&
    experiences.length > 0 &&
    experiences[0].company === "" &&
    !DUMMY_EXPERIENCES
  ) {
    // This part is just to keep the empty state logic if needed,
    // but we want to show dummy data now.
  }

  if (activeExperiences.length === 0) {
    return (
      <Card className="gap-0 py-0">
        <CardHeader className="flex items-center justify-between py-3">
          <CardTitle className="text-lg">Work Experience</CardTitle>
          <CardAction>
            <Button
              variant="outline"
              size={"lg"}
              className="gap-2 px-6"
              onClick={() => setExperienceDialogOpen(true)}
            >
              <Plus className="size-4" />
              Add
            </Button>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-lg text-black dark:text-white">Oops!!!</h3>
          <p className="text-gray-400 dark:text-gray-500">
            You haven&apos;t added any work experience to your profile yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="py-5">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Work Experience
          </CardTitle>
          <CardAction>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-gray-200 px-6"
              onClick={() => setExperienceDialogOpen(true)}
            >
              <Plus className="size-4" />
              Add Experience
            </Button>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardContent className="py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {activeExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </CardContent>
      </Card>

      <AddExperienceDialog />
    </>
  )
}

function ExperienceCard({ experience }: { experience: Experience }) {
  // Combine skills and tools for the tags section
  const tags = [...(experience.skills || []), ...(experience.tools || [])]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
          {experience.company || "Focus Peer"}
        </CardTitle>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-gray-300 px-3 text-xs text-gray-600 hover:bg-gray-50"
          >
            <Pencil className="size-3" />
            Edit
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 pt-0">
        <div className="space-y-1">
          <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400">
            {experience.role || "UI / UX Designer"}
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500">
            {experience.startDate || "January, 2025"} -{" "}
            {experience.isCurrent
              ? "Present"
              : experience.endDate || "December, 2025"}{" "}
            | {experience.locationType || "Remote"}
            {experience.location && `, ${experience.location}`}
            {experience.employmentType && ` | ${experience.employmentType}`}
          </p>
        </div>

        {experience.details && (
          <p className="line-clamp-2 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
            {experience.details}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag, index) => {
            const variant = getTagVariant(tag, index)
            return (
              <span
                key={tag + index}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-[11px] font-medium transition-colors",
                  variant
                )}
              >
                {tag}
              </span>
            )
          })}
          {tags.length > 4 && (
            <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-gray-600">
              +{tags.length - 4}
            </span>
          )}
        </div>

        <Button
          variant="outline"
          className="h-11 w-full border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          View
        </Button>
      </CardContent>
    </Card>
  )
}

function getTagVariant(tag: string, index: number) {
  const t = tag.toLowerCase()
  // Match the specific color types from the image
  if (
    t.includes("user interface") ||
    t.includes("ui") ||
    (index === 0 && !t.includes("figma"))
  )
    return "bg-[#E6F9F6] text-[#00A78E] border-[#D1F2ED]"
  if (t.includes("figma") || index === 1)
    return "bg-[#5D6370] text-white border-transparent"
  if (t.includes("prototyping") || index === 2)
    return "bg-[#F1F2F4] text-[#5D6370] border-[#E8EAEE]"
  if (t.includes("wireframing") || t.includes("sketch") || index >= 3)
    return "bg-[#FFF4E6] text-[#FF9500] border-[#FFE8CC]"

  return "bg-gray-50 text-gray-600 border-gray-200"
}

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Briefcase, MapPin, Wallet } from "lucide-react"
import NextImage from "next/image"
import { useRouter } from "next/navigation"

const SKILLS = [
  "User Interface",
  "Prototyping",
  "Wireframing",
  "User Experience",
  "UX Research",
]

export default function JobDetails() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="size-10 rounded-lg border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        >
          <ArrowLeft className="size-5 text-gray-950 dark:text-gray-100" />
        </Button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Job Description
        </h1>
      </div>

      {/* Main Job Info Card */}
      <Card className="p-0">
        <CardContent className="p-8">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Company Logo */}
            <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
              {/* Fallback to Briefcase icon if logo is missing */}
              <Briefcase className="absolute size-10 text-gray-200 dark:text-gray-800" />
              <NextImage
                src="/logos/finnovate.png"
                alt="Finnovate Logo"
                width={80}
                height={80}
                className="relative z-10 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>

            {/* Job Title and Metadata */}
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Product Designer
                  </h2>
                  <Badge
                    variant="outline"
                    className="border-red-100 bg-red-50 text-[11px] font-semibold text-red-500! dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400!"
                  >
                    Rejected
                  </Badge>
                </div>
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                  Finnovate
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 dark:bg-zinc-900 dark:text-gray-400">
                  <MapPin className="size-4 text-gray-400" />
                  Remote
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 dark:bg-zinc-900 dark:text-gray-400">
                  <Wallet className="size-4 text-gray-400" />
                  $70k - $90k
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 dark:bg-zinc-900 dark:text-gray-400">
                  <Briefcase className="size-4 text-gray-400" />
                  Full-time
                </div>
              </div>
            </div>

            {/* Applied Time */}
            <div className="self-end md:self-center">
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                Applied: 7 days ago
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Section */}
      <Card className="gap-3 py-5">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Details</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="py-6">
          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Job Summary */}
            <Card>
              <CardHeader className="px-6">
                <CardTitle className="line-height-1 text-[15px] font-semibold text-gray-900 dark:text-white">
                  Job Summary
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  Atlas Labs is looking for a Product Designer to design
                  intuitive, scalable digital experiences across web and mobile
                  products. The role involves close collaboration with product
                  managers and engineers to turn complex requirements into
                  clear, user-centered solutions. This position is integral to
                  our design team's dynamics, and impacts how users perceive and
                  interact with our products, driving overall satisfaction and
                  brand loyalty. Embedded within an innovative environment,
                  you'll collaborate with fellow designe...{" "}
                  <button className="font-bold text-gray-950 dark:text-white">
                    Read more...
                  </button>
                </p>
              </CardContent>
            </Card>

            {/* Key Responsibilities */}
            <Card>
              <CardHeader className="px-6">
                <CardTitle className="line-height-1 text-[15px] font-semibold text-gray-900 dark:text-white">
                  Key Responsibilities
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <ul className="list-inside list-disc space-y-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  <li>
                    Design user flows, wireframes, and high-fidelity UI for new
                    and existing features
                  </li>
                  <li>
                    Conduct user research and usability testing to inform design
                    decisions
                  </li>
                  <li>
                    Collaborate with engineering and product teams throughout
                    the product lifecycle
                  </li>
                  <li>
                    Maintain and contribute to the company's design system
                  </li>
                  <li>
                    Present design solutions and rationale to stakeholders
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card>
              <CardHeader className="px-6">
                <CardTitle className="line-height-1 text-[15px] font-semibold text-gray-900 dark:text-white">
                  Qualifications
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <ul className="list-inside list-disc space-y-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  <li>Strong UX and UI design fundamentals</li>
                  <li>Proficiency in Figma</li>
                  <li>Ability to communicate design decisions clearly</li>
                  <li>2–4 years of product design experience</li>
                  <li>Experience designing SaaS or Web3 products</li>
                  <li>
                    Basic understanding of frontend technologies (HTML, CSS)
                  </li>
                  <li>Motion or interaction design experience</li>
                </ul>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card>
              <CardHeader className="px-6">
                <CardTitle className="line-height-1 text-[15px] font-semibold text-gray-900 dark:text-white">
                  Skills Required
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="rounded-lg border-cyan-100 bg-cyan-50/50 px-3 py-1.5 text-[12px] font-medium text-cyan-600! dark:border-cyan-900/30 dark:bg-cyan-950/30 dark:text-cyan-400!"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader className="px-6">
                <CardTitle className="line-height-1 text-[15px] font-semibold text-gray-900 dark:text-white">
                  Benefits
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <ul className="list-inside list-disc space-y-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  <li>Flexible working hours</li>
                  <li>Remote work allowance</li>
                  <li>Learning and development budget</li>
                  <li>Health insurance</li>
                  <li>₦4,000,000 – ₦6,000,000 annually</li>
                </ul>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader className="px-6">
                <CardTitle className="line-height-1 text-[15px] font-semibold text-gray-900 dark:text-white">
                  Additional Information
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <ul className="list-inside list-disc space-y-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  <li>Applications close on March 30, 2026</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

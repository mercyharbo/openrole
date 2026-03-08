import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  title: "xjobs | AI-Powered Job Application Platform",
  description:
    "Automate your entire career search. From sourcing roles to tailoring resumes and auto-applying—let our AI handle the rejection while you handle the offers.",
  keywords: [
    "AI job applications",
    "automate job search",
    "resume tailoring",
    "career automation",
    "xjobs",
    "automated hiring",
  ],
  openGraph: {
    title: "xjobs | AI-Powered Job Application Platform",
    description: "Automate your entire career search with AI precision.",
    type: "website",
    locale: "en_US",
    siteName: "xjobs",
  },
  twitter: {
    card: "summary_large_image",
    title: "xjobs | AI-Powered Job Application Platform",
    description: "Automate your entire career search with AI precision.",
  },
}

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

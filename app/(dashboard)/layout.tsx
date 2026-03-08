"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import * as React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Root layout for the dashboard route group.
 * Orchestrates the sidebar state and global dashboard components.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  // Resolve title based on pathname
  const getPageTitle = () => {
    switch (pathname) {
      case "/":
      case "/dashboard":
        return "Overview"
      case "/profile":
        return "My Profile"
      case "/jobs":
        return "Jobs"
      case "/ai-tools":
        return "Ai Tools"
      case "/settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#FAFAFA] dark:bg-zinc-950/50">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col bg-transparent">
          <DashboardHeader title={getPageTitle()} />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

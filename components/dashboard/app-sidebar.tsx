"use client"

import {
  Briefcase,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"

const navMain = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Jobs",
    url: "/dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Ai Tools",
    url: "/dashboard/ai-tools",
    icon: Sparkles,
  },
]

const navSecondary = [
  {
    title: "Help & Support",
    url: "/dashboard/support",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
]

/**
 * Main application sidebar component.
 * Implements themed navigation links and brand identity.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const clearTokens = useAuthStore((state) => state.clearTokens)

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    clearTokens()
    router.push("/login")
  }

  return (
    <Sidebar
      className="border-none bg-[#3D424D] text-white dark:border-r dark:border-zinc-800 dark:bg-zinc-950"
      {...props}
    >
      <SidebarHeader className="flex h-20 items-center px-6 pt-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/10 text-white">
            <Image
              src="/Container.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">IBK</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-6">
        <SidebarMenu className="gap-2">
          {navMain.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "h-11 px-4 transition-colors",
                    isActive
                      ? "bg-white text-[#3D424D] hover:bg-white hover:text-[#3D424D]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        "size-5",
                        isActive ? "text-[#3D424D]" : "text-current"
                      )}
                    />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 pb-8">
        <SidebarMenu className="gap-2">
          {navSecondary.map((item) => {
            const isLogout = item.title === "Logout"
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-11 px-4 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={isLogout ? handleLogout : undefined}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon className="size-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

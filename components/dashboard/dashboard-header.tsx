"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useApplicantProfile } from "@/hooks/use-queries"
import { useAuthStore } from "@/lib/store/auth-store"
import {
  Bell,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Sun,
  User as UserIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
  title: string
}

/**
 * Header component for the dashboard area.
 * Displays the current page title and user context/utilities.
 */
export function DashboardHeader({ title }: DashboardHeaderProps) {
  const { applicant: user } = useApplicantProfile()
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const { clearTokens } = useAuthStore()

  const handleLogout = () => {
    clearTokens()
    router.push("/login")
  }

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b bg-white px-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1 lg:hidden" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="text-gray-500 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-400 dark:hover:bg-zinc-800"
          >
            <HelpCircle className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="relative text-gray-500 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-400 dark:hover:bg-zinc-800"
          >
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full border-2 border-white bg-red-500 dark:border-zinc-950" />
          </Button>
        </div>

        <div className="flex items-center gap-3 border-l pl-6 dark:border-zinc-800">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 transition-opacity outline-none hover:opacity-80">
                <Avatar className="size-10 border border-gray-100 dark:border-zinc-800">
                  <AvatarImage
                    src={user?.avatar_url ?? undefined}
                    alt={user?.full_name || "User"}
                  />
                  <AvatarFallback className="bg-primary/10 font-medium text-primary">
                    {user?.full_name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden font-medium text-gray-950 sm:block dark:text-white">
                  {user?.username || "N/A"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium dark:text-white">
                    {user?.full_name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-zinc-800" />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex w-full cursor-pointer items-center"
                >
                  <UserIcon className="mr-2 size-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex w-full cursor-pointer items-center"
                >
                  <Settings className="mr-2 size-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-zinc-800" />

              {/* Theme Toggle Items */}
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Appearance
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="flex cursor-pointer items-center"
              >
                <Sun className="mr-2 size-4" />
                <span>Light</span>
                {theme === "light" && (
                  <span className="ml-auto size-1.5 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="flex cursor-pointer items-center"
              >
                <Moon className="mr-2 size-4" />
                <span>Dark</span>
                {theme === "dark" && (
                  <span className="ml-auto size-1.5 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="flex cursor-pointer items-center"
              >
                <Settings className="mr-2 size-4" />
                <span>System</span>
                {theme === "system" && (
                  <span className="ml-auto size-1.5 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator className="dark:bg-zinc-800" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950/20"
              >
                <LogOut className="mr-2 size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-queries"
import { Bell, HelpCircle } from "lucide-react"

interface DashboardHeaderProps {
  title: string
}

/**
 * Header component for the dashboard area.
 * Displays the current page title and user context/utilities.
 */
export function DashboardHeader({ title }: DashboardHeaderProps) {
  const { user } = useUser()

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
          <span className="hidden font-semibold text-gray-950 sm:block dark:text-white">
            {user?.full_name || "N/A"}
          </span>
        </div>
      </div>
    </header>
  )
}

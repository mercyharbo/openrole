import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function PricingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50">
          <CardContent className="flex-1 space-y-4 p-5">
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
            <Separator className="bg-zinc-100 dark:bg-zinc-800" />
            <ul className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <li key={j} className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-5 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Metric Cards Skeleton Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-10 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <Card className="flex min-h-[400px] flex-col items-center justify-center border-dashed border-gray-200 dark:border-zinc-800">
        <Skeleton className="mb-4 size-20 rounded-2xl" />
        <Skeleton className="h-8 w-40 mb-2" />
        <div className="flex flex-col gap-1 items-center">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-48" />
        </div>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function ApplicationsLoadingSkeleton() {
  return (
    <main className="flex flex-col gap-5">
      {/* Header Skeleton */}
      <Card className="py-0">
        <CardContent className="px-8 py-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </CardContent>
        <div className="border-t px-8">
          <div className="flex gap-8 py-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </Card>

      {/* Grid Skeleton */}
      <Card className="flex-1 pb-10 gap-5">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-24" />
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-muted/50 border-none">
              <CardContent className="flex flex-col gap-6 p-6">
                {/* Company Info */}
                <div className="flex items-start gap-4">
                  <Skeleton className="size-14 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-2 w-full pt-1">
                    <Skeleton className="h-5 w-[60%]" />
                    <Skeleton className="h-4 w-[40%]" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-32 rounded-lg" />
                  <Skeleton className="h-8 w-32 rounded-lg" />
                </div>

                {/* AI Match Reason */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[95%]" />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}

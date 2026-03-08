import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function JobCardSkeleton() {
  return (
    <Card className='p-5 flex flex-col bg-muted/50'>
      <div className='flex justify-between items-start mb-6'>
        <div className='flex gap-4'>
          <Skeleton className='size-12 rounded-lg' />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-5 w-12 rounded' />
            </div>
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
        <Skeleton className='h-8 w-12' />
      </div>

      <div className='flex flex-wrap gap-2 mb-6'>
        <Skeleton className='h-7 w-24 rounded-md' />
        <Skeleton className='h-7 w-20 rounded-md' />
        <Skeleton className='h-7 w-24 rounded-md' />
      </div>

      <div className='flex flex-col gap-2 mb-6'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>

      <div className='flex flex-col gap-4 mt-auto'>
        <Skeleton className='h-4 w-28' />
        <div className='grid grid-cols-2 gap-3'>
          <Skeleton className='h-11 w-full rounded-md' />
          <Skeleton className='h-11 w-full rounded-md' />
        </div>
      </div>
    </Card>
  )
}

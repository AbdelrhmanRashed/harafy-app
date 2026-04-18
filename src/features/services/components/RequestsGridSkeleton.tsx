import { Skeleton } from '@/components/ui/skeleton';

export const RequestsGridSkeleton = () => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Toolbar Skeleton */}
      <div className="bg-card border-border flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between border rounded-lg">
        <Skeleton className="h-11 w-full md:max-w-md rounded-md" />
        
        <div className="flex w-full grid-cols-2 items-center gap-3 overflow-x-auto md:w-auto md:grid-cols-none">
          <Skeleton className="hidden h-11 w-11 shrink-0 rounded-md sm:block" />
          <Skeleton className="h-11 w-full min-w-[170px] rounded-md" />
          <Skeleton className="h-11 w-full min-w-[150px] rounded-md" />
          <Skeleton className="h-11 w-full min-w-[130px] rounded-md" />
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card border-border flex flex-col overflow-hidden rounded-xl border">
            {/* Image Skeleton */}
            <Skeleton className="h-48 w-full rounded-none" />
            
            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-4 flex flex-col gap-3">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>

              <Skeleton className="mb-2 h-4 w-full rounded-md" />
              <Skeleton className="mb-6 h-4 w-2/3 rounded-md" />

              <div className="mt-auto pt-2">
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className="bg-card border-border mt-6 flex flex-col items-center justify-between gap-4 rounded-lg border px-5 py-3 sm:flex-row">
        <Skeleton className="h-4 w-32 rounded-md" />
        <div className="flex items-center gap-2">
           <Skeleton className="h-9 w-20 rounded-md" />
           <Skeleton className="h-9 w-12 rounded-md" />
           <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
};

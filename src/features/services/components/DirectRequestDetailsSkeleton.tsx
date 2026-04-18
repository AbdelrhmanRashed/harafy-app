import { Skeleton } from '@/components/ui/skeleton';

const DirectRequestDetailsSkeleton = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="mx-auto max-w-7xl space-y-8 px-4 pt-6">
        {/* Header Skeleton */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="w-full space-y-3 md:w-auto">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Skeleton className="h-10 w-full rounded-full md:w-32" />
          </div>
        </div>

        {/* Timeline Skeleton */}
        <Skeleton className="h-32 w-full rounded-3xl" />

        {/* Banner Skeleton */}
        <Skeleton className="h-32 w-full rounded-3xl" />

        {/* Grid Layout Skeleton */}
        <div className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-3">
          {/* Right Column (Col 1 in RTL) */}
          <div className="space-y-6 lg:col-span-1">
            <Skeleton className="h-[400px] w-full rounded-3xl" />
          </div>
          {/* Left Column (Col 2, 3 in RTL) */}
          <div className="space-y-6 lg:col-span-2">
            <Skeleton className="h-[200px] w-full rounded-3xl" />
            <Skeleton className="mt-4 h-[300px] w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectRequestDetailsSkeleton;

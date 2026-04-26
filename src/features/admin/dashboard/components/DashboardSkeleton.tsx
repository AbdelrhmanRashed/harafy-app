import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="bg-background flex w-full flex-col gap-4">
      {/* Top row: 4 Stat Cards */}
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-card flex flex-col gap-3 rounded-xl border p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      {/* Bottom row: Charts & Actions */}
      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        {/* Requests Chart Skeleton */}
        <div className="bg-card flex h-[400px] flex-col rounded-2xl border shadow-sm">
          <div className="flex items-start justify-between p-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-[160px] rounded-md" />
          </div>
          <div className="flex-1 p-6 pt-0">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        {/* Side Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-card flex h-[400px] flex-col items-center justify-center rounded-xl border p-6 shadow-sm">
            <Skeleton className="mb-6 h-6 w-40 self-start" />
            <Skeleton className="h-48 w-48 rounded-full" />
          </div>
          <div className="bg-card flex h-[400px] flex-col rounded-xl border p-6 shadow-sm">
            <Skeleton className="mb-6 h-6 w-32" />
            <div className="flex flex-col space-y-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;

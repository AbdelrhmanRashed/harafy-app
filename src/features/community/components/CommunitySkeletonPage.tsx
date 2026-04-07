import { Skeleton } from '@/components/ui/skeleton';

const CommunitySkeletonPage = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Sidebar Skeleton (Profile Card) */}
        <div className="hidden lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <div className="space-y-4 rounded-xl border p-4">
            <Skeleton className="mx-auto h-20 w-20 rounded-full" />
            <Skeleton className="mx-auto h-4 w-3/4" />
            <Skeleton className="mx-auto h-3 w-1/2" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>

        {/* Middle Column (Create Post & Feed) */}
        <div className="col-span-1 space-y-4 lg:col-span-6">
          {/* Create Post Skeleton */}
          <div className="space-y-3 rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 flex-1 rounded-md" />
            </div>
          </div>

          {/* Feed Skeletons (كرر الـ Post أكتر من مرة) */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </div>
              <Skeleton className="h-40 w-full rounded-md" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar Skeleton (Quick Links) */}
        <div className="hidden lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <div className="space-y-4 rounded-xl border p-4">
            <Skeleton className="mb-4 h-5 w-1/2" />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="col-span-1 mt-4 lg:col-span-12">
          <div className="flex justify-center gap-4 py-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommunitySkeletonPage;

import { Skeleton } from '@/components/ui/skeleton';

const ServiceSearchCardSkeleton = () => {
  return (
    <div className="border-border/40 bg-card w-full rounded-[2.5rem] border p-6">
      {/* 1. Header: Avatar & Status Skeleton */}
      <div className="mb-5 flex items-start justify-between">
        <div className="relative">
          {/* Avatar Skeleton */}
          <Skeleton className="h-20 w-20 rounded-3xl" />
          {/* Status Indicator Skeleton */}
          <Skeleton className="border-card absolute -right-1.5 -bottom-1.5 h-6 w-6 rounded-full border-4" />
        </div>

        {/* Badge Skeleton */}
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>

      {/* 2. Body: Info Skeleton */}
      <div className="space-y-4">
        {/* Name and Icon */}
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-6 w-1/2 rounded-lg" />
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>

        {/* Stats Row */}
        <div className="flex flex-row items-center gap-4 pt-1">
          {/* Rating */}
          <Skeleton className="h-6 w-12 rounded-2xl" />
          {/* Jobs Count */}
          <Skeleton className="h-4 w-16 rounded-lg" />
          {/* Location */}
          <Skeleton className="h-4 w-20 rounded-lg" />
        </div>
      </div>

      {/* 3. Footer: Buttons Skeleton */}
      <div className="mt-8 flex gap-3">
        {/* Order Button Skeleton */}
        <Skeleton className="h-14 flex-[1.5] rounded-[1.5rem]" />
        {/* Profile Button Skeleton */}
        <Skeleton className="h-14 flex-1 rounded-[1.5rem]" />
      </div>
    </div>
  );
};

export default ServiceSearchCardSkeleton;

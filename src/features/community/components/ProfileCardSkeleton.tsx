import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ProfileCardSkeleton = () => {
  return (
    <Card className="bg-card w-full max-w-sm overflow-hidden rounded-3xl border-none shadow-sm">
      <CardContent className="p-6">
        {/* Header Section Skeleton (Avatar) */}
        <div className="relative mb-6 flex flex-col items-center">
          <div className="relative">
            {/* Avatar Circle */}
            <Skeleton className="border-background h-20 w-20 rounded-full border-4 shadow-sm" />
            {/* Online Status Dot */}
            <Skeleton className="border-background absolute right-1 bottom-1 h-4 w-4 rounded-full border-2" />
          </div>

          <div className="mt-3 flex flex-col items-center space-y-2">
            {/* Name */}
            <Skeleton className="h-5 w-32 rounded-md" />
            {/* Role */}
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>

        {/* Rating Section Skeleton */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <Skeleton className="h-3 w-20" /> {/* Text */}
            <Skeleton className="h-5 w-12 rounded-full" /> {/* Badge */}
          </div>
          <Skeleton className="h-2 w-full rounded-full" /> {/* Progress Bar */}
        </div>

        {/* Action Button Skeleton */}
        <Skeleton className="mt-6 h-[52px] w-full rounded-xl" />
      </CardContent>
    </Card>
  );
};

export default ProfileCardSkeleton;

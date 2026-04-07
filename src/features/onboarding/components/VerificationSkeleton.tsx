import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const VerificationSkeleton = () => {
  return (
    <div>
      <Card className="rounded-lg">
        <CardContent className="space-y-4 p-4">
          <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full max-w-[400px]" />
            </div>

            <Separator />

            {/* Service Details Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" /> {/* Label */}
                  <Skeleton className="h-11 w-full rounded-lg" />{' '}
                  {/* Select Input */}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" /> {/* Label */}
                  <Skeleton className="h-11 w-full rounded-lg" />{' '}
                  {/* Select Input */}
                </div>
              </div>
            </div>

            {/* Location Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-11 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-11 w-full rounded-lg" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Documents Skeleton */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-muted space-y-3 rounded-xl border p-4"
                >
                  <div className="flex justify-center py-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                  <Skeleton className="mx-auto h-4 w-24" />
                  <Skeleton className="mx-auto h-3 w-32" />
                </div>
              ))}
            </div>

            {/* Alert Box Skeleton */}
            <Skeleton className="h-16 w-full rounded-xl opacity-50" />

            {/* Buttons Skeleton */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Skeleton className="h-11 w-32 rounded-lg" />
              <Skeleton className="h-11 w-40 rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationSkeleton;

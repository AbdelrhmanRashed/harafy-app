import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileFormSkeleton = () => {
  return (
    <>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-33 rounded-lg" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4 pt-6">
        <Skeleton className="h-11 w-32 rounded-lg" />
        <Skeleton className="h-11 w-40 rounded-lg" />
      </div>
    </>
  );
};

export default ProfileFormSkeleton;

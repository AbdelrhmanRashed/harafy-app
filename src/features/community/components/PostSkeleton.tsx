import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const PostSkeleton = () => {
  return (
    <Card className="bg-card rounded-2xl border-0">
      <CardContent className="space-y-4 p-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Title */}
        <Skeleton className="h-4 w-1/2" />

        {/* Content */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>

        {/* Image */}
        <Skeleton className="h-48 w-full rounded-xl" />

        {/* Footer */}
        <div className="flex items-center gap-4 border-t pt-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostSkeleton;

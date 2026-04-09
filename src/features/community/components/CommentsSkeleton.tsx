import { Skeleton } from '@/components/ui/skeleton';

const CommentsSkeleton = () => {
  return (
    <div className="space-y-3 pt-2">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-2">
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSkeleton;

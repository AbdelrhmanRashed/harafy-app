import { usePostComments } from '../hooks/usePostComments';
import AddComment from './AddComment';
import CommentsSkeleton from './CommentsSkeleton';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Comment from './Comment';

const CommentsSection = ({ postId }: { postId: number }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostComments(postId, true);

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  console.log(comments);
  if (isLoading) return <CommentsSkeleton />;

  return (
    <div className="space-y-3 pt-2">
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-muted-foreground text-sm font-medium">
            لا توجد تعليقات بعد. كن أول من يعلق!
          </p>
        </div>
      ) : (
        <>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}

          {hasNextPage && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary w-full cursor-pointer transition-colors hover:bg-transparent"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <div className="flex items-center">
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  عرض التعليقات السابقة
                </div>
              ) : (
                'عرض التعليقات السابقة'
              )}
            </Button>
          )}
        </>
      )}
      <Separator />
      <AddComment postId={postId} />
    </div>
  );
};

export default CommentsSection;

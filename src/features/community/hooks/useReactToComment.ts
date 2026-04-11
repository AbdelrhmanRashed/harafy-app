import { useMutation } from '@tanstack/react-query';
import { updateReactToComment } from '../api/updateReactToComment';
import { toast } from 'sonner';
import { queryClient } from '@/lib/queryClient';

export const useReactToComment = (postId: number) => {
  return useMutation({
    mutationFn: ({
      commentId,
      reactionType,
    }: {
      commentId: number;
      reactionType: number;
    }) => updateReactToComment(commentId, reactionType),

    onMutate: ({ commentId, reactionType }) => {
      const previousData = queryClient.getQueryData(['post-comments', postId]);
      let toastMsg = 'تم الإعجاب بالتعليق';

      queryClient.setQueryData(['post-comments', postId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((comment: any) => {
              if (comment.id !== commentId) return comment;

              const wasLiked = comment.isReacted;
              toastMsg = wasLiked ? 'تم إلغاء الإعجاب' : 'تم الإعجاب بالتعليق';

              const existingReaction = comment.reactions.find(
                (r: any) => r.reactionType === reactionType,
              );
              const currentCount = existingReaction?.count ?? 0;

              const updatedReactions = existingReaction
                ? comment.reactions.map((r: any) =>
                    r.reactionType === reactionType
                      ? {
                          ...r,
                          count: wasLiked ? currentCount - 1 : currentCount + 1,
                        }
                      : r,
                  )
                : [...comment.reactions, { reactionType, count: 1 }];

              return {
                ...comment,
                isReacted: !wasLiked,
                reactions: updatedReactions,
              };
            }),
          })),
        };
      });

      return { previousData, toastMsg };
    },

    onSuccess: (_, __, context) => {
      toast.success(context?.toastMsg);
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        ['post-comments', postId],
        context?.previousData,
      );
      toast.error('حدث خطأ أثناء الإعجاب بالتعليق');
    },
  });
};

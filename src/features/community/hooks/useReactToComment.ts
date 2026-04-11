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

              const prevReactionType = comment.userReaction;
              const wasLiked =
                prevReactionType !== 0 && prevReactionType !== null; // ✅
              const isSameReaction =
                wasLiked && prevReactionType === reactionType; // ✅

              toastMsg = isSameReaction
                ? 'تم إلغاء الإعجاب'
                : 'تم الإعجاب بالتعليق';

              let updatedReactions = [...comment.reactions];

              if (wasLiked) {
                updatedReactions = updatedReactions
                  .map((r: any) =>
                    r.reactionType === prevReactionType
                      ? { ...r, count: r.count - 1 }
                      : r,
                  )
                  .filter((r: any) => r.count > 0);
              }

              if (!isSameReaction) {
                const existing = updatedReactions.find(
                  (r: any) => r.reactionType === reactionType,
                );
                updatedReactions = existing
                  ? updatedReactions.map((r: any) =>
                      r.reactionType === reactionType
                        ? { ...r, count: r.count + 1 }
                        : r,
                    )
                  : [...updatedReactions, { reactionType, count: 1 }];
              }

              return {
                ...comment,
                userReaction: isSameReaction ? 0 : reactionType,
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

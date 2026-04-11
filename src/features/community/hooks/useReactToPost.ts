import { useMutation } from '@tanstack/react-query';
import { updateReactToPost } from '../api/updateReactToPost';
import { toast } from 'sonner';
import { queryClient } from '@/lib/queryClient';

export const useReactToPost = () => {
  return useMutation({
    mutationFn: ({
      postId,
      reactionType,
    }: {
      postId: number;
      reactionType: number;
    }) => updateReactToPost(postId, reactionType),

    onMutate: ({ postId, reactionType }) => {
      const previousData = queryClient.getQueriesData({ queryKey: ['posts'] });
      let toastMsg = 'تم الإعجاب';

      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((post: any) => {
              if (post.id !== postId) return post;

              const prevReactionType = post.userReaction; // 0 = مفيش reaction
              const wasLiked =
                prevReactionType !== 0 && prevReactionType !== null;
              const isSameReaction =
                wasLiked && prevReactionType === reactionType;

              toastMsg = isSameReaction ? 'تم إلغاء الإعجاب' : 'تم الإعجاب';

              let updatedReactions = [...post.topReactions];

              // 1. نقص القديم لو كان فيه reaction
              if (wasLiked) {
                updatedReactions = updatedReactions
                  .map((r: any) =>
                    r.reactionType === prevReactionType
                      ? { ...r, count: r.count - 1 }
                      : r,
                  )
                  .filter((r: any) => r.count > 0);
              }

              // 2. زود الجديد لو مش نفس الـ reaction
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
                ...post,
                userReaction: isSameReaction ? 0 : reactionType, // ✅ 0 بدل null
                topReactions: updatedReactions,
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
      context?.previousData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error('حدث خطأ أثناء التفاعل مع المنشور');
    },
  });
};

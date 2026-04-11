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

              const wasLiked = post.isReacted;
              toastMsg = wasLiked ? 'تم إلغاء الإعجاب' : 'تم الإعجاب';

              const existingReaction = post.topReactions.find(
                (r: any) => r.reactionType === reactionType,
              );
              const currentCount = existingReaction?.count ?? 0;

              const updatedReactions = existingReaction
                ? post.topReactions.map((r: any) =>
                    r.reactionType === reactionType
                      ? {
                          ...r,
                          count: wasLiked ? currentCount - 1 : currentCount + 1,
                        }
                      : r,
                  )
                : [...post.topReactions, { reactionType, count: 1 }];

              return {
                ...post,
                isReacted: !wasLiked,
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

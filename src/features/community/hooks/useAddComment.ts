import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/addComment';

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => addComment(postId, message),

    onMutate: () => {
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((post: any) =>
              post.id === postId
                ? { ...post, commentsCount: post.commentsCount + 1 }
                : post,
            ),
          })),
        };
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
    },
  });
};

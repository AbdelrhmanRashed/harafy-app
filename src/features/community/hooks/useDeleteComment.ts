import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/deleteComment';
import { toast } from 'sonner';

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),

    // remove the comment from the UI immediately
    onMutate: (commentId) => {
      // queryClient.setQueryData(['post-comments', postId], (oldData: any) => {
      //   if (!oldData) return oldData;
      //   return {
      //     ...oldData,
      //     pages: oldData.pages.map((page: any) => ({
      //       ...page,
      //       data: page.data.filter((c: any) => c.id !== commentId),
      //     })),
      //   };
      // });
      // decrease the count of comments on the post
      //   queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: any) => {
      //     if (!oldData) return oldData;
      //     return {
      //       ...oldData,
      //       pages: oldData.pages.map((page: any) => ({
      //         ...page,
      //         data: page.data.map((post: any) =>
      //           post.id === postId
      //             ? { ...post, commentsCount: post.commentsCount - 1 }
      //             : post,
      //         ),
      //       })),
      //     };
      //   });
    },

    onSuccess: () => {
      toast.success('تم حذف التعليق');
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },

    onError: () => {
      // if the mutation fails, invalidate the queries to refetch the data
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.error('فشل حذف التعليق');
    },
  });
};

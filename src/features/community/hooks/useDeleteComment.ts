import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/deleteComment';
import { toast } from 'sonner';

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),

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

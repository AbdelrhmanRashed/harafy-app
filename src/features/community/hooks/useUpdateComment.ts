import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../api/updateComment';
import { toast } from 'sonner';

export const useUpdateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      Message,
    }: {
      commentId: number;
      Message: string;
    }) => updateComment(commentId, Message),
    onSuccess: () => {
      toast.success('تم تحديث التعليق بنجاح');
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
    },
    onError: () => {
      toast.error('فشل تحديث التعليق');
    },
  });
};

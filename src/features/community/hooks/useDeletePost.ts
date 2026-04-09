import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/deletePost';
import { toast } from 'sonner';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),

    onMutate: (postId) => {
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((post: any) => post.id !== postId),
          })),
        };
      });
    },

    onSuccess: () => {
      toast.success('تم حذف المنشور');
    },
    onError: () => {
      toast.error('فشل حذف المنشور');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

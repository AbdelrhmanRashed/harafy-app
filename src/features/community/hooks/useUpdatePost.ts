import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../api/updatePost';
import { toast } from 'sonner';

export const useUpdatePost = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { Title: string; Description: string }) =>
      updatePost(postId, data),

    onSuccess: (_, variables) => {
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((post: any) =>
              post.id === postId
                ? {
                    ...post,
                    title: variables.Title,
                    description: variables.Description,
                  }
                : post,
            ),
          })),
        };
      });
      toast.success('تم تحديث المنشور بنجاح');
    },

    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.error('فشل تحديث المنشور');
    },
  });
};

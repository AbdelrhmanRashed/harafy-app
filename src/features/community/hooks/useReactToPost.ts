import { useMutation } from '@tanstack/react-query';
import { updateReactToPost } from '../api/updateReactToPost';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useReactToPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      reactionType,
    }: {
      postId: number;
      reactionType: number;
    }) => updateReactToPost(postId, reactionType),

    onMutate: ({ postId, reactionType }) => {
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((post: any) => {
              if (post.id !== postId) return post;
              return {
                ...post,
                topReactions: [
                  {
                    reactionType,
                    count: 1,
                  },
                ],
              };
            }),
          })),
        };
      });
    },
    onSuccess: () => {
      toast.success('تم التفاعل مع المنشور بنجاح');
    },
    onError: (error) => {
      console.error('Error reacting to post:', error);
      toast.error('حدث خطأ أثناء التفاعل مع المنشور');
    },
  });
};

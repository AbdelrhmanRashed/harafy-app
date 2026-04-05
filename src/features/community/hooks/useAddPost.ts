import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost } from '../api/addPost';
import { toast } from 'sonner';

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,

    onSuccess: () => {
      toast.success('تم نشر البوست');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

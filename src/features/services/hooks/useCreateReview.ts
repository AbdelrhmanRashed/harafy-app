import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '../api/createReview';
import { toast } from 'sonner';

export const useCreateReview = (providerId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createReview(data),

    onSuccess: () => {
      toast.success('تم إضافة التقييم بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['provider-data', providerId],
      });
    },
    onError: () => {
      toast.error('فشل إضافة التقييم');
    },
  });
};

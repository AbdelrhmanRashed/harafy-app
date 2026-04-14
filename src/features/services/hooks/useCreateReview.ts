import { useMutation } from '@tanstack/react-query';
import { createReview } from '../api/createReview';
import { toast } from 'sonner';

export const useCreateReview = () => {
  return useMutation({
    mutationFn: (data: any) => createReview(data),

    onSuccess: () => {
      toast.success('تم إضافة التقييم بنجاح');
    },
    onError: () => {
      toast.error('فشل إضافة التقييم');
    },
  });
};

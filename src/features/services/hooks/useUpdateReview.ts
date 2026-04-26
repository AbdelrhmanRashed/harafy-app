import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReview } from '../api/updateReview';
import { toast } from 'sonner';

export const useUpdateReview = (
  reviewId: number,
  requestId: string,
  providerId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { Rating: number; Message: string }) =>
      updateReview(reviewId, data),
    onSuccess: () => {
      toast.success('تم تحديث التقييم بنجاح');

      queryClient.invalidateQueries({
        queryKey: ['provider-reviews', providerId, 'client'],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-reviews'],
      });
      // Also invalidate the specific request details
      queryClient.invalidateQueries({
        queryKey: ['service-requests', requestId],
      });
    },
    onError: (error: unknown) => {
      console.error('Error updating review:', error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          'حدث خطأ أثناء تحديث التقييم، يرجى المحاولة مرة أخرى',
      );
    },
  });
};

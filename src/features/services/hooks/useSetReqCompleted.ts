import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setReqCompleted } from '../api/setReqCompleted';
import { toast } from 'sonner';

export const useSetReqCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setReqCompleted,
    onSuccess: () => {
      toast.success('تم اكتمال الطلب بنجاح');
      queryClient.invalidateQueries({ queryKey: ['service-requests'] });
      queryClient.invalidateQueries({ queryKey: ['provider-his-profile'] });
      queryClient.invalidateQueries({ queryKey: ['credit-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['credit-transactions-all'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'حدث خطأ أثناء تحديث حالة الطلب');
    },
  });
};

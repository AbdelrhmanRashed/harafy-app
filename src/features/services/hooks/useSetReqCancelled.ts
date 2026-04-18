import { useMutation } from '@tanstack/react-query';
import { setReqCancelled } from '../api/setReqCancelled';
import { toast } from 'sonner';

export const useSetReqCancelled = () => {
  return useMutation({
    mutationFn: setReqCancelled,
    onSuccess: () => {
      toast.success('تم إلغاء الطلب بنجاح');
    },
    onError: (error: any) => {
      toast.error(error.message || 'حدث خطأ أثناء إلغاء الطلب');
    },
  });
};

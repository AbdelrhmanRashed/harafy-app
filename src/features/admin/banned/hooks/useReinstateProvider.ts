import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reinstateProvider } from '../api/reinstateProvider';
import { toast } from 'sonner';

export const useReinstateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (providerId: number) => reinstateProvider(providerId),
    onSuccess: () => {
      toast.success('تم رفع الحظر بنجاح');
      queryClient.invalidateQueries({ queryKey: ['banned-users'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء رفع الحظر');
    },
  });
};

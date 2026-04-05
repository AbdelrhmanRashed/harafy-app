import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateClientProfile } from '../api/updateClientProfile';

export const useUpdateClientProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClientProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-profile'] });
      toast.success('تم تحديث الملف الشخصي بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء التحديث');
    },
  });
};

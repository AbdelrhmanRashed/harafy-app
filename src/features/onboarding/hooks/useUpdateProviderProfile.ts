import { useMutation } from '@tanstack/react-query';
import { updateProviderProfile } from '../api/providerDocs';
import { toast } from 'sonner';
import { queryClient } from '@/lib/queryClient';

export const useUpdateProviderProfile = () => {
  return useMutation({
    mutationFn: updateProviderProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-status'] });
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث الملف الشخصي');
    },
  });
};

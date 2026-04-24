import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  updateProviderData,
  type UpdateProviderDataPayload,
} from '../api/updateProviderData';

export const useUpdateProviderData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProviderDataPayload) =>
      updateProviderData(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-profile'] });
      toast.success('تم تحديث البيانات بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث البيانات');
    },
  });
};

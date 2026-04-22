import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignServiceReq } from '../api/assignServiceReq';
import { toast } from 'sonner';

type Vars = { requestId: string; providerId: number };

export const useAssignServiceReq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, providerId }: Vars) =>
      assignServiceReq(requestId, providerId),
    onSuccess: (_d, v) => {
      toast.success('تم تعيين الحرفى');
      queryClient.invalidateQueries({ queryKey: ['service-requests'] });
      queryClient.invalidateQueries({
        queryKey: ['service-requests', v.requestId],
      });
      queryClient.invalidateQueries({
        queryKey: ['request-offer', v.requestId],
      });
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || 'حدث خطأ أثناء تعيين الطلب');
    },
  });
};

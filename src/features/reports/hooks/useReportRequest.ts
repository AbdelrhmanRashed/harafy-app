import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportRequest, type ReportRequestParams } from '../api/reportRequest';
import { toast } from 'sonner';

export const useReportRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReportRequestParams) => reportRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-requests'] });
      toast.success('تم الإبلاغ بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ');
    },
  });
};

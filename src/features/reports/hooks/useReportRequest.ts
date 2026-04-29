import { useMutation } from '@tanstack/react-query';
import { reportRequest, type ReportRequestParams } from '../api/reportRequest';
import { toast } from 'sonner';

export const useReportRequest = () => {
  return useMutation({
    mutationFn: (data: ReportRequestParams) => reportRequest(data),
    onSuccess: () => {
      toast.success('تم الإبلاغ بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ');
    },
  });
};

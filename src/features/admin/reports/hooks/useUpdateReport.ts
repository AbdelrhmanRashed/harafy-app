import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReport, type UpdateReportParams } from '../api/reports.api';
import { toast } from 'sonner';

export const useUpdateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateReportParams) => updateReport(data),
    onSuccess: (_, variables) => {
      const label =
        variables.Status === 1
          ? 'تم الحل — سيتم حظر مقدم الخدمة'
          : 'تم رفض البلاغ';
      toast.success(label);
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Report already handled') {
        toast.error('تم التعامل مع هذا البلاغ مسبقاً');
      } else {
        toast.error('حدث خطأ ما، حاول مرة أخرى');
      }
    },
  });
};

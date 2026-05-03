import { useMutation } from '@tanstack/react-query';
import { uploadDocumentation } from '../api/providerDocs';
import { toast } from 'sonner';
import { queryClient } from '@/lib/queryClient';

export const useUploadDocuments = () => {
  return useMutation({
    mutationFn: async (docs: { file: File; type: number }[]) => {
      const results = [];

      for (const doc of docs) {
        const form = new FormData();
        form.append('DocumentType', String(doc.type));
        form.append('DocumentFile', doc.file);

        const result = await uploadDocumentation(form);
        results.push(result);
      }

      return results;
    },
    onSuccess: () => {
      toast.success('تم رفع المستندات بنجاح');
      queryClient.invalidateQueries({ queryKey: ['account-status'] });
    },
    onError: () => {
      toast.error('حدث خطأ أثناء رفع المستندات');
    },
  });
};

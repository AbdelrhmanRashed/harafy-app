import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProviderDocs } from '../api/providerDocs';
import { toast } from 'sonner';

interface UpdateDocPayload {
  docId: number;
  file: File;
  fileName?: string;
}

export const useUpdateProviderDocs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (docs: UpdateDocPayload[]) => {
      const results = [];

      for (const { docId, file, fileName } of docs) {
        const formData = new FormData();
        formData.append('DocumentFile', file);
        if (fileName) formData.append('FileName', fileName);

        const result = await updateProviderDocs(docId, formData);
        results.push(result);
      }

      return results;
    },
    onSuccess: () => {
      toast.success('تم تحديث المستندات بنجاح');
      queryClient.invalidateQueries({ queryKey: ['account-status'] });
      queryClient.invalidateQueries({ queryKey: ['provider-docs'] });
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث المستندات');
    },
  });
};

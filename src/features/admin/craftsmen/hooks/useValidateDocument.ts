import { useMutation } from '@tanstack/react-query';
import { validateDocs } from '../api/validateDocs';

type ValidateDocumentPayload = {
  id: number;
  isValid: boolean;
};

export const useValidateDocument = () => {
  return useMutation({
    mutationFn: ({ id, isValid }: ValidateDocumentPayload) =>
      validateDocs(id, isValid),

    onError: (error: any) => {
      console.error('Validate Document Error:', error);
    },
  });
};

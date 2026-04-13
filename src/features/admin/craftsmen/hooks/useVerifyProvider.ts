import { useMutation } from '@tanstack/react-query';
import { verifyProvider } from '../api/verifyProvider';

export const useVerifyProvider = () => {
  return useMutation({
    mutationFn: ({ id, isVerified }: { id: string; isVerified: boolean }) =>
      verifyProvider(id, isVerified),

    onError: (error: any) => {
      console.error('Verify Provider Error:', error);
    },
  });
};

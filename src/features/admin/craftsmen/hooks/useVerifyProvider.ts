import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verifyProvider } from '../api/verifyProvider';

export const useVerifyProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isVerified }: { id: string; isVerified: boolean }) =>
      verifyProvider(id, isVerified),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-details'] });
      queryClient.invalidateQueries({ queryKey: ['under-review-providers'] });
    },
    onError: (error: any) => {
      console.error('Verify Provider Error:', error);
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '../api/deleteAccount';
import { toast } from 'sonner';

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success('تم حذف حسابك بنجاح.');
    },
    onError: (error: unknown) => {
      console.error('Error deleting account:', error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          'حدث خطأ أثناء حذف الحساب، يرجى المحاولة مرة أخرى',
      );
    },
  });
};

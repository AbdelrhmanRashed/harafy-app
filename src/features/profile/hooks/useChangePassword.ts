import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../api/changePassword';
import { toast } from 'sonner';
import { getChangePasswordErrorMessage } from '@/lib/errors';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('تم تغيير كلمة المرور بنجاح');
    },
    onError: (error: any) => {
      toast.error(getChangePasswordErrorMessage(error));
    },
  });
};

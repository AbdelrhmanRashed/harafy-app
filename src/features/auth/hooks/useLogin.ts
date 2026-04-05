import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { getLoginErrorMessage } from '@/lib/errors';
import { getMainRole } from '@/lib/role';
import { ROLE_REDIRECT } from '@/constants/redirects';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { saveUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      saveUser(data);
      toast.success('تم تسجيل الدخول بنجاح');
      // Get main role of user
      const role = getMainRole(data.role, data.isProvider);

      // Add redirect to page depending on user role
      const redirectPath = ROLE_REDIRECT[role];
      // Navigate to page depending on user role
      console.log(redirectPath);
      navigate(redirectPath, { replace: true });
    },
    // Error handling
    onError: (error: any) => {
      toast.error(getLoginErrorMessage(error));
      console.log(error);
    },
  });
};

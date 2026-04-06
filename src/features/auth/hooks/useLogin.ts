import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { getLoginErrorMessage } from '@/lib/errors';

import { useNavigate } from 'react-router-dom';
import { getRedirectPath } from '@/lib/auth/getRedirectPath';
import { mapProfileStatus } from '@/lib/auth/mapProfileStatus';

export const useLogin = () => {
  const { saveUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      saveUser(data);
      toast.success('تم تسجيل الدخول بنجاح');

      //  map status
      const profileStatus = mapProfileStatus(data.profileStatus);

      //  build user object
      const user = {
        roles: data.role,
        isProvider: data.isProvider,
        profileStatus,
      };

      //  Get correct path
      const redirectPath = getRedirectPath(user);

      navigate(redirectPath, { replace: true });
    },
    // Error handling
    onError: (error: any) => {
      toast.error(getLoginErrorMessage(error));
      console.log(error);
    },
  });
};

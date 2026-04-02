import { useMutation } from '@tanstack/react-query';
import { logout } from '../api/logout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();
  const { removeUser } = useAuthStore();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeUser();
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/auth/login');
    },
    onError: () => {
      removeUser();
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/auth/login');
    },
  });
};

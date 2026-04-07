import { useMutation } from '@tanstack/react-query';
import { logout } from '../api/logout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { queryClient } from '@/lib/queryClient';

export const useLogout = () => {
  const navigate = useNavigate();
  const { removeUser } = useAuthStore();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeUser();
      queryClient.clear();
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/auth/login');
    },
    onError: () => {
      removeUser();
      queryClient.clear();
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/auth/login');
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { register } from '../api/register';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getRegisterErrorMessage } from '@/lib/errors';

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('تم إنشاء الحساب بنجاح');
      navigate('/auth/login');
    },
    onError: (error) => {
      toast.error(getRegisterErrorMessage(error));
    },
  });
};

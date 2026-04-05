import axiosInstance from '@/lib/axios';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isProvider: boolean;
}

export const register = async (data: RegisterData) => {
  try {
    const res = await axiosInstance.post('/api/Account/register', data);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

import axiosInstance from '@/lib/axios';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const res = await axiosInstance.post('/Account/login', data);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

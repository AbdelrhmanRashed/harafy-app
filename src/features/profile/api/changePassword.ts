import axiosInstance from '@/lib/axios';

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePassword) => {
  const res = await axiosInstance.post('Account/change-password', data);
  return res.data;
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

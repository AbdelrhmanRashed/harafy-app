import axiosInstance from '@/lib/axios';

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePassword) => {
  const res = await axiosInstance.post('/Account/change-password', data);
  return res.data;
};

import axiosInstance from '@/lib/axios';

export const verifyProvider = async (id: string, isVerified: boolean) => {
  const response = await axiosInstance.patch(
    `/api/Provider/VerifyProvider/${id}`,
    null,
    {
      params: { isVerified },
    },
  );
  return response.data;
};

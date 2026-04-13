import axiosInstance from '@/lib/axios';

export const validateDocs = async (id: number, isValid: boolean) => {
  const response = await axiosInstance.put(
    `/api/Document/validate-document/${id}`,
    null,
    {
      params: { isValid },
    },
  );
  return response.data;
};

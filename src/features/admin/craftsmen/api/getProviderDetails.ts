import axiosInstance from '@/lib/axios';

export const getProviderDetails = async (id: string) => {
  try {
    const [profileRes, docsRes] = await Promise.all([
      axiosInstance.get(`/api/Provider/get-provider-profile/${id}`),
      axiosInstance.get(`/api/Document/get-documents`, {
        params: { providerId: id },
      }),
    ]);

    return {
      profile: profileRes.data,
      documents: docsRes.data,
    };
  } catch (error) {
    console.log(error);
  }
};

// /api/Provider/get-provider-profile/72


import axiosInstance from "@/lib/axios";

export const getProviderData = async (id: string) => {
    const response = await axiosInstance.get(`/api/Provider/get-provider-profile/${id}`);
    return response.data;
}

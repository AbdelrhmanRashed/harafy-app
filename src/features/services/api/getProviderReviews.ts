///api/Review/provider-reviews/72

import axiosInstance from "@/lib/axios";

export const getProviderReviews = async (id: string) => {
    const response = await axiosInstance.get(`/api/Review/provider-reviews/${id}`);
    return response.data;
} 
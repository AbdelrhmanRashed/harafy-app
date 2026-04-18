import axiosInstance from "@/lib/axios";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

export type MyProviderReview = {
  id: number;
  rating: number;
  message: string;
  clientName: string;
  clientPictureUrl: string | null;
};

export const getMyProviderReviews = async (
  providerId: number
): Promise<MyProviderReview[]> => {
  if (!providerId || providerId <= 0) return [];
  const res = await axiosInstance.get(`/api/Review/provider-reviews/${providerId}`);
  const data: MyProviderReview[] = Array.isArray(res.data)
    ? res.data
    : res.data.data ?? [];

  return data.map((review) => ({
    ...review,
    clientPictureUrl: review.clientPictureUrl
      ? review.clientPictureUrl.startsWith("http")
        ? review.clientPictureUrl
        : `${BASE_URL}/${review.clientPictureUrl}`
      : null,
  }));
};
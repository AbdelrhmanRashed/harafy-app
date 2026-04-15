import axiosInstance from "@/lib/axios";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

export type MyProviderReview = {
  id: number;
  providerId: number;
  serviceRequestId: number;
  rating: number;
  message: string;
  clientName?: string | null;
  clientPictureUrl?: string | null;
};

export const getMyProviderReviews = async (
  providerId: number,
  assignedRequests: any[] = []
): Promise<MyProviderReview[]> => {
  const res = await axiosInstance.get(`/api/Review/provider-reviews/${providerId}`);
  const reviews: MyProviderReview[] = Array.isArray(res.data)
    ? res.data
    : res.data.data ?? [];

  return reviews.map((review) => {
    const match = assignedRequests.find((r) => r.id === review.serviceRequestId);
    const rawPicture = match?.clientPictureUrl ?? null;
    const clientPictureUrl = rawPicture
      ? rawPicture.startsWith("http")
        ? rawPicture
        : `${BASE_URL}/${rawPicture}`
      : null;

    return {
      ...review,
      clientName: match?.clientName ?? null,
      clientPictureUrl,
    };
  });
};
import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../api/getMyReviews";
import type { Review } from "../types/reviewTypes";

export const useGetMyReviews = (serviceRequestId?: number) =>
  useQuery<Review[]>({
    queryKey: ["my-reviews", serviceRequestId],
    queryFn: () => getMyReviews(serviceRequestId),
  });
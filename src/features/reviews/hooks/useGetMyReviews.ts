import { useQuery } from '@tanstack/react-query';
import { getMyReviews } from '../api/getMyReviews';
import type { Review } from '../types/reviewTypes';

export const useGetMyReviews = (
  serviceRequestId?: number,
  options?: { refetchInterval?: number | false; enabled?: boolean },
) =>
  useQuery<Review[]>({
    queryKey: ['my-reviews', serviceRequestId],
    queryFn: () => getMyReviews(serviceRequestId),
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled !== false,
  });

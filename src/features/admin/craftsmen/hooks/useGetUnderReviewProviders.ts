import { useQuery } from '@tanstack/react-query';
import { getUnderReviewProviders } from '../api/getUnderReviewProviders';
import type { IProvider } from '../types/providers';

export const useGetUnderReviewProvider = () => {
  return useQuery<IProvider[]>({
    queryKey: ['under-review-providers'],
    queryFn: getUnderReviewProviders,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

import { useQuery } from '@tanstack/react-query';
import { getProviderReviews } from '../api/getProviderReviews';

export const useGetProviderReviews = (providerId: string) => {
  return useQuery({
    queryKey: ['provider-reviews', providerId],
    queryFn: () => getProviderReviews(providerId),
    enabled: !!providerId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

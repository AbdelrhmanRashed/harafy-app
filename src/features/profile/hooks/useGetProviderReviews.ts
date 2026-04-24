import { useQuery } from '@tanstack/react-query';
import { getProviderReviews } from '../api/getProviderReviews';

export const useGetProviderReviews = (
  providerId?: string,
  type?: 'client' | 'provider',
) => {
  return useQuery({
    queryKey: ['provider-reviews', providerId, type],
    queryFn: () => getProviderReviews(providerId, type),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

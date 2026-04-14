import { useQuery } from '@tanstack/react-query';
import { getLiveLocation } from '../api/getLiveLocation';

export const useInitialLocation = (providerId?: string) => {
  return useQuery({
    queryKey: ['live-location', providerId],
    queryFn: () => getLiveLocation(providerId!),
    enabled: !!providerId,
  });
};

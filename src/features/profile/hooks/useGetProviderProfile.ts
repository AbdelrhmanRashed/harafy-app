import { useQuery } from '@tanstack/react-query';
import { getProviderProfile } from '../api/getProviderProfile';

export const useGetProviderProfile = (id: string | undefined) => {
  return useQuery({
    queryKey: ['provider-profile', id],
    queryFn: () => getProviderProfile(id!),
    enabled: !!id,
  });
};

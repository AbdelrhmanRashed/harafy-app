import { useQuery } from '@tanstack/react-query';
import { getProviderProfile } from '../api/getProviderProfile';

export const useMyProviderProfile = (enabled = true) => {
  return useQuery({
    queryKey: ['provider-profile'],
    queryFn: getProviderProfile,
    enabled,
  });
};

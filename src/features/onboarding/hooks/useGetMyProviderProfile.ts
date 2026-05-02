import { useQuery } from '@tanstack/react-query';
import { getMyProviderProfile } from '../api/providerDocs';

export const useGetMyProviderProfile = () => {
  return useQuery({
    queryKey: ['my-provider-profile'],
    queryFn: getMyProviderProfile,
    // Don't throw - we use isError to know profile doesn't exist yet
    retry: false,
  });
};

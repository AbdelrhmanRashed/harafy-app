import { useQuery } from '@tanstack/react-query';
import { getProviderDetails } from '../api/getProviderDetails';

export const useProviderDetails = (id: string) => {
  return useQuery({
    queryKey: ['provider-details', id],
    queryFn: () => getProviderDetails(id),
  });
};

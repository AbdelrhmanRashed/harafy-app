import { useQuery } from '@tanstack/react-query';
import { fetchProviderDocs } from '../api/providerDocs';

export const useGetProviderDocs = () => {
  return useQuery({
    queryKey: ['provider-docs'],
    queryFn: fetchProviderDocs,
  });
};

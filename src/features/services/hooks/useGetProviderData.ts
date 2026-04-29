import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getProviderData } from '../api/getProviderData';

export const useGetProviderData = (
  id: string,
  options?: Partial<UseQueryOptions<any, Error>>,
) => {
  return useQuery({
    queryKey: ['provider-data', id],
    queryFn: () => getProviderData(id),
    enabled: !!id,
    ...options,
  });
};

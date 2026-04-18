import { useQuery } from '@tanstack/react-query';
import { getServiceReqById } from '../api/getServiceReqById';
import type { DirectRequestDetails } from '../types/directRequest';

export const useGetServiceReqById = (id: string | null) => {
  return useQuery<DirectRequestDetails>({
    queryKey: ['service-requests', id],
    queryFn: () => getServiceReqById(id!),
    enabled: !!id,
    staleTime: 0,
    refetchInterval: 10 * 1000,
  });
};

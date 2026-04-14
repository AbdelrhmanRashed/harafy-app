import { useQuery } from '@tanstack/react-query';
import { getServiceReqById } from '../api/getServiceReqById';

export const useGetServiceReqById = (id: string | null) => {
  return useQuery({
    queryKey: ['service-requests', id],
    queryFn: () => getServiceReqById(id!),
    enabled: !!id,
  });
};

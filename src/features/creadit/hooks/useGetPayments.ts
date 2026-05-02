import { useQuery } from '@tanstack/react-query';
import { getPayments } from '../api/getPayments';

export const useGetPayments = (pageIndex = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['payments', pageIndex, pageSize],
    queryFn: () => getPayments(pageIndex, pageSize),
    staleTime: 1000 * 60 * 2, // 2 min
  });
};

import { useQuery } from '@tanstack/react-query';
import { getCreditTransactions, getAllCreditTransactions } from '../api/getCreditTransactions';

export const useGetCreditTransactions = (pageIndex = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['credit-transactions', pageIndex, pageSize],
    queryFn: () => getCreditTransactions(pageIndex, pageSize),
  });
};

/** Used only for computing stats totals */
export const useGetAllCreditTransactions = () => {
  return useQuery({
    queryKey: ['credit-transactions-all'],
    queryFn: getAllCreditTransactions,
  });
};

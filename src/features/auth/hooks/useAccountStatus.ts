import { useQuery } from '@tanstack/react-query';
import { getStatus } from '../api/status';

interface AccountStatus {
  role: string[];
  isProvider: boolean;
  status: number;
}

export const useAccountStatus = () => {
  return useQuery<AccountStatus>({
    queryKey: ['account-status'],
    queryFn: getStatus,
    staleTime: 0,
  });
};

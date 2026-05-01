import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getStatus } from '../api/status';
import { useAuthStore } from '@/store/useAuthStore';

interface AccountStatus {
  role: string[];
  isProvider: boolean;
  status: number;
}

export const useAccountStatus = () => {
  const query = useQuery<AccountStatus>({
    queryKey: ['account-status'],
    queryFn: getStatus,
    staleTime: 0,
  });

  const updateUser = useAuthStore((state) => state.updateUser);

  useEffect(() => {
    if (query.data) {
      updateUser({
        role: query.data.role,
        isProvider: query.data.isProvider,
        status: query.data.status,
      });
    }
  }, [query.data, updateUser]);

  return query;
};

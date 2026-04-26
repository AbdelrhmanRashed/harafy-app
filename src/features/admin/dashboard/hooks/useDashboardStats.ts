import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/getDashboardStats';

export const useDashboardStats = (period: number) => {
  return useQuery({
    queryKey: ['admin-dashboard-stats', period],
    queryFn: () => getDashboardStats(period),
  });
};

import { useQuery } from '@tanstack/react-query';
import { getAllReports } from '../api/reports.api';
import type { PaginatedReports } from '../types/report.types';

export const useGetAllReports = (pageIndex: number, pageSize: number) => {
  return useQuery<PaginatedReports>({
    queryKey: ['admin-reports', pageIndex, pageSize],
    queryFn: () => getAllReports(pageIndex, pageSize),
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });
};

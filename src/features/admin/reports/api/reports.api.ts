import axiosInstance from '@/lib/axios';
import type { PaginatedReports } from '../types/report.types';

// ─── GET all reports (paginated) ──────────────────────────────────────────────
export const getAllReports = async (
  pageIndex: number,
  pageSize: number,
): Promise<PaginatedReports> => {
  const response = await axiosInstance.get<PaginatedReports>(
    '/api/Report/all-reports',
    { params: { PageIndex: pageIndex, PageSize: pageSize } },
  );
  return response.data;
};

// ─── PUT take action on a report ─────────────────────────────────────────────
// Status: 1 = Resolved (provider banned), 2 = Rejected (no action)
export interface UpdateReportParams {
  id: number;
  Status: 1 | 2;
  AdminNote?: string | null;
}

export const updateReport = async ({
  id,
  Status,
  AdminNote,
}: UpdateReportParams): Promise<void> => {
  try {
    await axiosInstance.put(`/api/Report/resolve-report/${id}`, {
      Status,
      AdminNote,
    });
  } catch (error: any) {
    throw error;
  }
};

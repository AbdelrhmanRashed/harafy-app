import axiosInstance from '@/lib/axios';

export interface ReportRequestParams {
  ServiceRequestId: number;
  ReportType: number;
  Reason?: string | null;
}

export const reportRequest = async (data: ReportRequestParams) => {
  const response = await axiosInstance.post<any>(
    `/api/Report/report-request`,
    data,
  );
  return response;
};

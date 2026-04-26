import axiosInstance from '@/lib/axios';

export interface DashboardStatsResponse {
  clientsNotProviders: number;
  providers: number;
  openRequests: number;
  inProgressRequests: number;
  requestsPerDay: {
    date: string;
    count: number;
  }[];
}

export const getDashboardStats = async (period: number): Promise<DashboardStatsResponse> => {
  const response = await axiosInstance.get(`/api/Admin/get-admin-dashboard`, {
    params: { period }
  });
  return response.data;
};

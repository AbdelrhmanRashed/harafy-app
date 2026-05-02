import axiosInstance from '@/lib/axios';

export interface Payment {
  id: number;
  credits: number;
  amount: number;
  status: number; // 1=pending, 2=succeeded, 3=failed
  createdAt: string;
}

export interface PaymentsResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Payment[];
}

export const getPayments = async (
  pageIndex = 1,
  pageSize = 10,
): Promise<PaymentsResponse> => {
  const res = await axiosInstance.get<PaymentsResponse>('/api/Payment/payments', {
    params: { pageIndex, pageSize },
  });
  return res.data;
};

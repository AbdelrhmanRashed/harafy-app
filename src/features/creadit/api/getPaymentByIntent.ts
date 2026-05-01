import axiosInstance from '@/lib/axios';

export interface PaymentByIntent {
  id: number;
  credits: number;
  amount: number;
  status: number;
  createdAt: string;
}

export const getPaymentByIntent = async (referenceId: string): Promise<PaymentByIntent> => {
  const res = await axiosInstance.get<PaymentByIntent>(
    `/api/Payment/payment-by-intent/${referenceId}`,
  );
  return res.data;
};

import axiosInstance from '@/lib/axios';

export interface CreditTransaction {
  id: number;
  amount: number;
  type: number; // 0 = credit purchase (شحن), 1 = deduction (استهلاك)
  createdAt: string;
  referenceId?: string;
}

export interface CreditTransactionsResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: CreditTransaction[];
}

export const getCreditTransactions = async (
  pageIndex = 1,
  pageSize = 10,
): Promise<CreditTransactionsResponse> => {
  const res = await axiosInstance.get<CreditTransactionsResponse>(
    '/api/Payment/credit-transactions',
    { params: { pageIndex, pageSize } },
  );
  return res.data;
};

/** Fetches all transactions for computing totals by paginating through all pages */
export const getAllCreditTransactions = async (): Promise<CreditTransaction[]> => {
  let allData: CreditTransaction[] = [];
  let pageIndex = 1;
  const pageSize = 50;

  while (true) {
    const res = await getCreditTransactions(pageIndex, pageSize);
    allData = allData.concat(res.data);
    
    if (allData.length >= res.count || res.data.length === 0) {
      break;
    }
    pageIndex++;
  }

  return allData;
};

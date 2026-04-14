import { useGetServiceReqById } from '@/features/services/hooks/useGetServiceReqById';

export const useActiveRequest = () => {
  const requestId = localStorage.getItem('activeRequestId');

  const query = useGetServiceReqById(requestId);

  return {
    request: query.data,
    isLoading: query.isLoading,
  };
};

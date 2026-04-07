import { useQuery } from '@tanstack/react-query';
import { getServices } from '../api/services';

export const useServices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  return { data, isLoading, error };
};

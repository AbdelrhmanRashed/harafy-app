import { useQuery } from '@tanstack/react-query';
import { getGovernorate } from '../api/getGovernorate';

export const useGovernorate = <T>() => {
  return useQuery<T>({
    queryKey: ['governorate'],
    queryFn: getGovernorate,
  });
};

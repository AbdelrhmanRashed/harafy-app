import { useQuery } from '@tanstack/react-query';
import { getGovernorate } from '@/features/profile/api/getGovernorate';
import { useGovernorateStore } from '@/store/useGovernorateStore';
import { useEffect } from 'react';
import type { Governorate } from '@/types/governorate.types';

export const useGovernorate = () => {
  const { governorates, setGovernorates, _hasHydrated } = useGovernorateStore();

  const query = useQuery<Governorate[]>({
    queryKey: ['governorate'],
    queryFn: getGovernorate,

    enabled: _hasHydrated && (!governorates || governorates.length === 0),

    staleTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,

    placeholderData: governorates ?? undefined,
  });

  useEffect(() => {
    if (query.data && (!governorates || governorates.length === 0)) {
      setGovernorates(query.data);
    }
  }, [query.data, governorates, setGovernorates]);

  return {
    governorates: governorates ?? query.data,
    isLoading: query.isLoading,
  };
};

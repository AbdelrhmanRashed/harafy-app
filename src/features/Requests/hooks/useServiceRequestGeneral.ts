import { useQuery } from '@tanstack/react-query';
import { getServiceRequestById } from '../api/serviceRequestGeneral';
import type { ServiceRequestGeneral } from '../types/providerOfferTypes';

export const useServiceRequestGeneral = (
    id: number | undefined,
    options?: { refetchInterval?: number; enabled?: boolean },
) => {
    return useQuery<ServiceRequestGeneral>({
        queryKey: ['service-request-general', id],
        queryFn: () => getServiceRequestById(id!),
        enabled: !!id && (options?.enabled ?? true),
        refetchInterval: options?.refetchInterval,
    });
};
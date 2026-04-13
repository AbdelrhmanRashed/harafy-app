import { useQuery } from "@tanstack/react-query";
import { getServiceReqById } from "../api/getServiceReqById";

export const useGetServiceReqById = (id: string, options?: any) => {
    return useQuery({
        queryKey: ['service-requests', id],
        queryFn: () => getServiceReqById(id),
        enabled: !!id,
        ...options,
    });
};

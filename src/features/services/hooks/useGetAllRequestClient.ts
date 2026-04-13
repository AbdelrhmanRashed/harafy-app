import { useQuery } from "@tanstack/react-query";
import { getAllRequestClient } from "../api/getAllRequestClient";

export const useGetAllRequestClient = () => {
    return useQuery({
        queryKey: ['service-requests', 'client'],
        queryFn: getAllRequestClient,
    });
};

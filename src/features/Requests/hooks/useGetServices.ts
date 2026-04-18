import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/getServices";

export const useGetServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    staleTime: Infinity, 
  });
};
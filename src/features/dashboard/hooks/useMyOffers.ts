import { useQuery } from "@tanstack/react-query";
import { getMyOffers } from "../api/getMyOffers";

export const useMyOffers = () => {
  return useQuery({
    queryKey: ["my-offers"],
    queryFn: getMyOffers,
  });
};
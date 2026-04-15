import { useAssignedRequests } from "../../Requests/hooks/useAssignedRequests";

export const useCurrentProviderId = (): number => {
  const { data } = useAssignedRequests();
  return data?.[0]?.providerId ?? 0;
};
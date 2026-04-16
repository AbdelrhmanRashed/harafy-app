import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startRequest } from "../api/startRequest";
import { toast } from "sonner";

export const useStartRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isAccepted }: { id: number; isAccepted: boolean }) =>
      startRequest(id, isAccepted),
    onSuccess: (_, variables) => {
      if (variables.isAccepted) {
        toast.success("تم قبول الطلب بنجاح");
      } else {
        toast.success("تم رفض الطلب");
      }
      queryClient.invalidateQueries({ queryKey: ["assigned-requests"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "حدث خطأ");
    },
  });
};
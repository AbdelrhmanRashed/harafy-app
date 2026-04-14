import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOffer } from "../api/createOffer";
import { toast } from "sonner";

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOffer,
    onSuccess: () => {
      toast.success("تم إرسال عرضك بنجاح");
      queryClient.invalidateQueries({ queryKey: ["available-requests"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error.message ?? "حدث خطأ");
    },
  });
};
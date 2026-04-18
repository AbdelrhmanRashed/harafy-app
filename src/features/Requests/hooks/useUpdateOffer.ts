import { useMutation } from "@tanstack/react-query";
import { updateOffer } from "../api/updateOffer";
import { toast } from "sonner";

export const useUpdateOffer = () => {
  return useMutation({
    mutationFn: updateOffer,
    onSuccess: () => {
      toast.success("تم تحديث عرضك بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error.message ?? "حدث خطأ");
    },
  });
};
import { useMutation } from "@tanstack/react-query";
import { deleteOffer } from "../api/deleteOffer";
import { toast } from "sonner";

export const useDeleteOffer = () => {
  return useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => {
      toast.success("تم إلغاء عرضك");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error.message ?? "حدث خطأ");
    },
  });
};
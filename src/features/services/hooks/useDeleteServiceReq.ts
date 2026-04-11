import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteServiceReq } from "../api/deleteServiceReq";
import { toast } from "sonner";

export const useDeleteServiceReq = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteServiceReq,
        onSuccess: () => {
            toast.success('تم حذف الطلب بنجاح');
            queryClient.invalidateQueries({ queryKey: ['service-requests'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'حدث خطأ أثناء حذف الطلب');
        },
    });
};

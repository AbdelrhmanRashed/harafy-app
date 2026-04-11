import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setReqCancelled } from "../api/setReqCancelled";
import { toast } from "sonner";

export const useSetReqCancelled = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: setReqCancelled,
        onSuccess: () => {
            toast.success('تم إلغاء الطلب بنجاح');
            queryClient.invalidateQueries({ queryKey: ['service-requests'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'حدث خطأ أثناء إلغاء الطلب');
        },
    });
};

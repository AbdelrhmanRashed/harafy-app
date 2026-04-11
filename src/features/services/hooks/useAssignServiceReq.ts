import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignServiceReq } from "../api/assignServiceReq";
import { toast } from "sonner";

export const useAssignServiceReq = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: assignServiceReq,
        onSuccess: () => {
            toast.success('تم تعيين الطلب بنجاح');
            queryClient.invalidateQueries({ queryKey: ['service-requests'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'حدث خطأ أثناء تعيين الطلب');
        },
    });
};

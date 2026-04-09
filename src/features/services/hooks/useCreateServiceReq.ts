import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServiceReq } from "../api/createServiceReq";
import { toast } from "sonner";

export const useCreateServiceReq = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createServiceReq,

        onSuccess: () => {
            toast.success('تم إنشاء طلب الخدمة');
            queryClient.invalidateQueries({ queryKey: ['service-requests'] });
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { directRequest } from "../api/directRequest.ts";
import { toast } from "sonner";

export const useDirectRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ formData, providerId }: { formData: FormData; providerId: string }) =>
            directRequest(formData, providerId),

        onSuccess: () => {
            toast.success('تم إنشاء الطلب المباشر');
            queryClient.invalidateQueries({ queryKey: ['direct-requests'] });
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};

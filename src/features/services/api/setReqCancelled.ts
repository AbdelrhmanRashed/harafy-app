// /api/ServiceRequest/cancel/1
//put
import axiosInstance from "@/lib/axios";

export const setReqCancelled = async (id: string) => {
    const response = await axiosInstance.put(`/api/ServiceRequest/cancel/${id}`);
    return response.data;
}
// /api/ServiceRequest/complete/1
//put
import axiosInstance from "@/lib/axios";

export const setReqCompleted = async (id: string) => {
    const response = await axiosInstance.put(`/api/ServiceRequest/complete/${id}`);
    return response.data;
}

// /api/ServiceRequest/get-request-byid/2
import axiosInstance from "@/lib/axios";

export const getServiceReqById = async (id: string) => {
    const response = await axiosInstance.get(`/api/ServiceRequest/get-request-byid/${id}`);
    return response.data;
}

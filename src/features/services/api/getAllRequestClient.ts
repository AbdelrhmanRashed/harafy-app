// /api/ServiceRequest/my-requests
import axiosInstance from "@/lib/axios";

export const getAllRequestClient = async () => {
    const response = await axiosInstance.get(`/api/ServiceRequest/my-requests`);
    return response.data;
}
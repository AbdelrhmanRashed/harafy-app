// /api/ServiceRequest/assign/1 
//put

import axiosInstance from "@/lib/axios";

export const assignServiceReq = async (id: string) => {
    const response = await axiosInstance.put(`/api/ServiceRequest/assign/${id}`);
    return response.data;
}
///api/ServiceRequest/delete-service-request/1
//delete

import axiosInstance from "@/lib/axios";

export const deleteServiceReq = async (id: string) => {
    const response = await axiosInstance.delete(`/api/ServiceRequest/delete-service-request/${id}`);
    return response.data;
}
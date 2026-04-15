///api/ServiceRequest/create-and-assign-request/2

import axiosInstance from "@/lib/axios";

export const directRequest = async (formData: FormData, providerId: string) => {
    try {
    const res = await axiosInstance.post(`/api/ServiceRequest/create-and-assign-request/${providerId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;} catch (error) {
        console.error('Error creating and assigning service request:', error);
        throw error;
    }
};

import axiosInstance from "@/lib/axios";

export const createServiceReq = async (formData: FormData) => {
    try {
        const res = await axiosInstance.post('/api/ServiceRequest/create-service-request', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (error) {
        console.error('Error creating service request:', error);
        throw error;
    }
};
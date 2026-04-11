
// /api/RequestOffer/get-request-offers/25

import axiosInstance from "@/lib/axios";

export const getRequestOffer = async (requestId: string) => {
    const response = await axiosInstance.get(`/api/RequestOffer/get-request-offers/${requestId}`);
    return response.data;
}

    

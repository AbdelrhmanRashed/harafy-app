// PUT /api/ServiceRequest/assign/{requestId}?providerId={providerId}

import axiosInstance from "@/lib/axios";

export const assignServiceReq = async (
  requestId: string,
  providerId: number,
) => {
  const response = await axiosInstance.put(
    `/api/ServiceRequest/assign/${requestId}`,
    {},
    { params: { providerId } },
  );
  return response.data;
};

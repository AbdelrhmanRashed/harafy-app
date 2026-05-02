import axiosInstance from '@/lib/axios';

export interface RequestByReference {
  id: number;
  requestStatus: number;
  description: string;
  finalPrice: number | null;
  createdAt: string;
  preferredTime: string | null;
  clientId: number;
  providerId: number;
  serviceRequestLocation: {
    latitude: number;
    longitude: number;
    address: string | null;
  } | null;
  serviceId: number;
  imageUrls: string[];
}

export const getRequestByReference = async (referenceId: string): Promise<RequestByReference> => {
  const res = await axiosInstance.get<RequestByReference>(
    `/api/ServiceRequest/get-request-byid-general/${referenceId}`,
  );
  return res.data;
};

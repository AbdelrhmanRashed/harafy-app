import axiosInstance from '@/lib/axios';
import type { ServiceRequestGeneral } from '../types/providerOfferTypes';

export const getServiceRequestById = async (
  id: number,
): Promise<ServiceRequestGeneral> => {
  const { data } = await axiosInstance.get<ServiceRequestGeneral>(
    `/api/ServiceRequest/get-request-byid-general/${id}`,
  );
  return data;
};
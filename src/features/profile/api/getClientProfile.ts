import axiosInstance from '@/lib/axios';
import type { ClientProfile } from '../types/client-profile.types';

export const getClientProfile = async (): Promise<ClientProfile> => {
  const res = await axiosInstance.get<ClientProfile>(
    '/api/Client/get-client-profile',
  );
  return res.data;
};

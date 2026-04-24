import axiosInstance from '@/lib/axios';

export interface UpdateProviderDataPayload {
  Bio: string;
  Nickname: string;
  GovernorateId: number;
  RegionId: number;
  ServiceIds: number[];
  BaseLocation: {
    AddressText: string;
    Latitude: number;
    Longitude: number;
  };
}

/**
 * PATCH provider profile — server requires all fields even for partial updates.
 * Caller should spread existing provider data and override only BaseLocation.
 */
export const updateProviderData = async (
  payload: UpdateProviderDataPayload,
): Promise<void> => {
  await axiosInstance.patch('/api/Provider/update-provider-profile', payload);
};

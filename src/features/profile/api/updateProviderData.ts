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
// /api/Provider/update-provider-profile
// {
//     "Bio" : "Reliable electrician with 8+ years’ experience in residential and commercial wiring",
//     "Nickname" : "Ashraf lamba",
//     "GovernorateId" : 1,
//     "RegionId" : 2,
//     "BaseLocation" : {
//         "Latitude" : 45.67,
//         "Longitude" : 13.95,
//         "AddressText" : "Ras El Bar"
//     },
//     "ServiceIds" : [1, 4]
// }
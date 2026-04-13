export interface CreateServiceReq {
    Description: string;
    ServiceId: number
    Latitude: number;
    Longitude: number;
    Images: File[];

}

export interface ServiceRequestType {
    id: number;
    requestStatus: number;
    description: string;
    finalPrice: number | null;
    createdAt: string;
    preferredTime: string | null;
    clientId: number;
    providerId: number | null;
    serviceRequestLocation: {
        latitude: number;
        longitude: number;
    };
    serviceId: number;
    imageUrls: string[];

}

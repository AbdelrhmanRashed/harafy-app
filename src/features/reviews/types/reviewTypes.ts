export interface Review {
    id: number;
    rating: number;
    message: string;
    clientName: string;
    clientPictureUrl?: string;
    createdAt: string;
    serviceRequestId: number;
}
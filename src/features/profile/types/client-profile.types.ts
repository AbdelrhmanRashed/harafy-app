// Shape returned by GET /Client/get-client-profile
export interface ClientProfile {
  firstName: string;
  lastName: string;
  gender: 0 | 1;
  dateOfBirth: string;
  pictureUrl: string | null;
  phoneNumbers: string[];
  governorateId: number;
  regionId: number;
}

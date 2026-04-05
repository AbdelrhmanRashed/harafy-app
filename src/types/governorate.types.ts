export interface Governorate {
  id: number;
  name: string;
  regions: Region[];
}

export interface Region {
  id: number;
  name: string;
}

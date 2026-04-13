export interface IProvider {
  id: number;
  name: string;
  age: number;
  pictureUrl: string;
  documents: { id: number; url: string }[];
  actions: string;
}

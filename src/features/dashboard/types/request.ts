export type Offer = {
  id: number;
  user: {
    name: string;
    country: string;
    avatar: string;
  };
  description: string;
  time: string;
  images?: string[];
};
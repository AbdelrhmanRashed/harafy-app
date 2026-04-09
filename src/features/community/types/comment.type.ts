export type CommentType = {
  id: number;
  postId: number;
  clientId: number;
  message: string;
  createdAt: string;
  reactions: any[];
  clientName: string;
  clientPictureUrl: string | null;
  isProvider: boolean;
  providerId: number | null;
};

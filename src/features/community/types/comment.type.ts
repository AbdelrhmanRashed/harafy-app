export interface CommentResponse {
  id: number;
  postId: number;
  clientId: number;
  message: string;
  createdAt: string;
  reactions: CommentReactionType[];
  clientName: string;
  clientPictureUrl: string | null;
  isProvider: boolean;
  providerId: number | null;
  isReacted: boolean;
}

export interface CommentReactionType {
  count: number;
  reactionType: number;
}

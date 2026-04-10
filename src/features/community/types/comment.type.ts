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
}

export interface CommentReactionType {
  id: number;
  commentId: number;
  reactionType: number;
  clientId: number;
  createdAt: string;
}

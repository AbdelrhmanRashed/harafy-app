export interface AddPost {
  Title: string;
  Description: string;
  Images: File[];
}

export interface PostType {
  id: number;
  clientId: number;
  governorateId: number;
  regionId: number;
  title: string;
  description: string | null;
  createdAt: string;
  imageUrls: string[];
  commentsCount: number;
  topReactions: TopReactionType[];
  clientName: string;
  clientPictureUrl: string;
}

export interface TopReactionType {
  reactionType: number;
  count: number;
}

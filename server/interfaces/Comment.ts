export interface IComment {
  text: string;
  stars: number;
  landmarkId: number;
  userId: number;
}

export interface ICommentModify {
  text?: string;
  stars?: number;
  landmarkId: number;
  userId: number;
  commentId: number;
}

export type CommentViewDto = {
  id: string;
  author: {
    id: string;
    display_name: string;
    image: string | null;
    username: string;
    created_at: string;
    role: string;
  };
  content: string;
  like_count: number;
  dislike_count: number;
  liked_by: boolean;
  disliked_by: boolean;
  reply_count: number;
  created_at: string;
  updated_at: string;
};

export type CreateCommentDto = {
  postId: string;
  content: string;
};

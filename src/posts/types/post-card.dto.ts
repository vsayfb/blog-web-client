export type PostCardDto = {
  title: string;
  url: string;
  id: string;
  published: boolean;
  content: string;
  tags: { id: string; name: string; created_at: string; updated_at: string }[];
  author: {
    id: string;
    display_name: string;
    username: string;
    image: string | null;
  };
  title_image: string | null;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
};

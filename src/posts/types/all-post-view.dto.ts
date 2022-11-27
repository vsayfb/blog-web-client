export type AllPostViewDto = {
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
    image: string;
  };
  title_image: string | null;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
}[];

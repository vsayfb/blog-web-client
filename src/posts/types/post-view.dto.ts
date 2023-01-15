export type PostViewDto = {
  title: string;
  url: string;
  id: string;
  content: string;
  author: {
    id: string;
    display_name: string;
    username: string;
    image: string;
    created_at: string;
  };
  title_image: string | null;
  bookmarked_by: boolean;
  liked_by: boolean;
  disliked_by: boolean;
  created_at: string;
  updated_at: string;
};

export type UpdatedPostDto = {
  title: string;
  url: string;
  id: string;
  published?: boolean;
  content: string;
  tags: { id: string; name: string; created_at: string; updated_at: string }[];
  author: {
    id: string;
    display_name: string;
    username: string;
    image: string;
    created_at: string;
  };
  title_image: string | null;
  created_at: string;
  updated_at: string;
};

export type PostViewDto = {
  title: string;
  url: string;
  id: string;
  published: boolean;
  content: string;
  tags: { id: string; name: string; created_at: string; updated_at: string }[];
  author: {
    id: string;
    displayName: string;
    username: string;
    image: string | null;
  };
  title_image: string | null;
  created_at: string;
  updated_at: string;
};



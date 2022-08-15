export type PostViewDto = {
  title: string;
  url: string;
  id: string;
  published: boolean;
  content: string;
  tags: { id: string; name: string; created_at: Date; updated_at: Date }[];
  author: {
    id: string;
    displayName: string;
    username: string;
    image: string | null;
  };
  title_image: string | null;
  created_at: Date;
  updated_at: Date;
};

export type Auth = {
  account: {
    username: string;
    image: string | null;
    id: string;
  };
  access_token: string;
};

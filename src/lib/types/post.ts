export type PostViewDto = {
  title: string;
  url: string;
  id: string;
  published: boolean;
  content: string;
  tags: { id: string; name: string; createdAt: Date; updatedAt: Date }[];
  author: {
    id: string;
    displayName: string;
    username: string;
    image: string | null;
  };
  titleImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};


export type Auth = {
  account: {
    username: string;
    image: string | null;
    id: string;
  };
  access_token: string;
};
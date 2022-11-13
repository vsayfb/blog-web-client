

export type Auth = {
  account: {
    username: string;
    image: string | null;
    id: string;
  };
  access_token: string;
};

import { Subscriptions } from "../../subscriptions/Subscriptions";

export type ProfileViewDto = {
  data: {
    id: string;
    username: string;
    display_name: string;
    image: string | null;
    role: string;
    followers_count: number;
    following_count: number;
    following_by: boolean;
    subscriptions: Subscriptions;
  };
  message: string;
};

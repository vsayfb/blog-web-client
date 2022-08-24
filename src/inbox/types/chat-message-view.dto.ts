import { AccountViewDto } from "../../accounts/types/account-view-dto";

export type ChatMessageViewDto = {
  id: string;
  chatID: string;
  content: string;
  sender: AccountViewDto;
  created_at: string;
  updated_at: string;
};

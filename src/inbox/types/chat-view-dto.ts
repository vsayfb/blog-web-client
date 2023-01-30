import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { ChatMessageViewDto } from "./chat-message-view.dto";

export type ChatViewDto = {
  id: string;
  created_at: string;
  updated_at: string;
  last_message: { content: string; id: string };
  messages: ChatMessageViewDto[];
  members: AccountViewDto[];
};

export type NewChatViewDto = {
  id: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessageViewDto[];
  members: AccountViewDto[];
};

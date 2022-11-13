import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { AppColors } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { ChatMessageViewDto } from "../types/chat-message-view.dto";
import { ChatMessage } from "./ChatMessage";

export const ChatMessagesArea = ({
  messages,
}: {
  messages: ChatMessageViewDto[];
}) => {
  const { me } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full overflow-y-auto p-4 relative">
      <ul>
        <li className="pb-16 pt-16">
          {messages.map((m) => {
            if (m.sender.id === me.sub) {
              return (
                <ChatMessage
                  key={m.id}
                  position="right"
                  content={m.content}
                  created_at={m.created_at}
                />
              );
            }
            return (
              <ChatMessage
                key={m.id}
                position="left"
                content={m.content}
                created_at={m.created_at}
                sender={m.sender}
              />
            );
          })}
        </li>
      </ul>
    </div>
  );
};

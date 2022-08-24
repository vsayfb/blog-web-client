import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { setChat } from "../slices/inboxSlice";
import { ChatViewDto } from "../types/chat-view-dto";
import { ChatMessagesArea } from "./ChatMessagesArea";
import { ChatTitle } from "./ChatTitle";
import { SendMessageToChat } from "./SendMessageToChat";

export const Chat = ({ chatID }: { chatID: string }) => {
  const { me } = useSelector((state: RootState) => state.auth);

  const { chat } = useSelector((state: RootState) => state.inbox);

  const [targetUser, setTargetUser] = useState<AccountViewDto>();

  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest(`chats/${chatID}`, "get", true)
      .then((chat: { data: ChatViewDto }) => {
        setTargetUser(chat.data.members.find((m) => m.id !== me.sub));

        dispatch(setChat(chat.data));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });
  }, [chatID]);

  if (chat && targetUser)
    return (
      <div className="col-span-2 bg-zinc-900">
        <div className="w-full">
          <ChatTitle
            image={targetUser.image || ""}
            title={targetUser?.display_name}
          />
          <ChatMessagesArea messages={chat.messages} />

          <SendMessageToChat chatID={chatID} />
        </div>
      </div>
    );
  else return null;
};

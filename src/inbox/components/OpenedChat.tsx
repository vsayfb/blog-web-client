import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { sendRequest } from "../../lib/sendRequest";
import { AppColors, setError } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import {
  addMessageToOpenedChat,
  resetOpenedChat,
  setOpenedChat,
} from "../slices/inboxSlice";
import { ChatViewDto } from "../types/chat-view-dto";
import { ChatMessagesArea } from "./ChatMessagesArea";
import { ChatTitle } from "./ChatTitle";
import { SendMessageToChat } from "./SendMessageToChat";
import { io, Socket } from "socket.io-client";
import { ChatMessageViewDto } from "../types/chat-message-view.dto";
import { detectImage } from "../../lib/detectImage";

const socket = io(`${process.env.REACT_APP_HOST}/chats`, {
  auth: { token: localStorage.getItem("token") },
});

export const OpenedChat = ({
  chatID,
  colors,
  theme,
}: {
  chatID: string;
  colors: AppColors;
  theme: string;
}) => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  const { openedChat } = useSelector((state: RootState) => state.inbox);

  const [targetUser, setTargetUser] = useState<AccountViewDto>();

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("joined", (msg: string) => {});

    socket.on("message", (message: ChatMessageViewDto) => {
      if (chatID === message.chatID) {
        dispatch(addMessageToOpenedChat(message));
      }
    });

    socket.emit("chat", chatID);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("joined");
      socket.off("message");
    };
  }, [chatID]);

  useEffect(() => {
    sendRequest(`chats/${chatID}`, "get", true)
      .then((chat: { data: ChatViewDto }) => {
        setTargetUser(chat.data.members.find((m) => m.id !== me.sub));

        dispatch(setOpenedChat(chat.data));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });

    return () => {
      dispatch(resetOpenedChat());
      setTargetUser(undefined);
    };
  }, [chatID]);

  if (openedChat?.messages && targetUser)
    return (
      <>
        <div
          className={`col-span-2 overflow-auto ${
            theme === "dark" ? "bg-" + colors.zinc900 : "bg-" + colors.zinc50
          }`}
          style={{ height: "500px" }}
        >
          <div className="w-full">
            <ChatTitle
              image={detectImage(targetUser.image)}
              title={targetUser?.display_name}
              colors={colors}
              theme={theme}
            />
            <ChatMessagesArea messages={openedChat.messages} />

            <SendMessageToChat chatID={chatID} />
          </div>
        </div>
      </>
    );
  else return null;
};

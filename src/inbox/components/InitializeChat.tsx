import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { sendRequest } from "../../lib/sendRequest";
import { AppColors } from "../../lib/slices/appSlice";
import {
  addNewChat,
  resetFoundUser,
  setOpenedChatID,
  setSearchingUsersForChat,
} from "../slices/inboxSlice";
import { ChatImageSvg } from "../svgs/ChatImageSvg";
import { ChatSendMessageSvg } from "../svgs/ChatSendMessageSvg";
import { ChatViewDto } from "../types/chat-view-dto";
import { ChatTitle } from "./ChatTitle";

export const InitiliazeChat = ({
  targetUser,
  colors,
  theme,
}: {
  targetUser: AccountViewDto;
  colors: AppColors;
  theme: string;
}) => {
  const dispatch = useDispatch();

  const [firstMessage, setFirstMessage] = useState("");

  useEffect(() => {
    return () => {
      dispatch(resetFoundUser());
    };
  }, []);

  async function initializeChat() {
    const { data }: { data: ChatViewDto } = await sendRequest(
      "chats/",
      "post",
      true,
      {
        toID: targetUser.id,
        firstMessage,
      }
    );

    dispatch(setOpenedChatID(data.id));

    dispatch(addNewChat(data));

    dispatch(setSearchingUsersForChat(false));
  }

  return (
    <div
      className={`col-span-2 ${
        theme === "dark" ? "bg-" + colors.zinc900 : "bg-" + colors.zinc50
      }`}
    >
      <div className="w-full">
        <ChatTitle
          image={targetUser.image || ""}
          title={targetUser.display_name}
          colors={colors}
          theme={theme}
        />

        {/* SPACE  */}

        <div className="pb-14 pt-14"> </div>

        <div
          className={`w-full py-3 px-3 flex items-center justify-between border-t ${
            theme === "dark" ? "border-orange-200" : "border-blue-600"
          }`}
        >
          <ChatImageSvg />

          <input
            placeholder="Send message"
            className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
            type="text"
            name="message"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            required
          />

          <button onClick={() => initializeChat()}>
            <ChatSendMessageSvg
              fill={theme === "dark" ? "#fed7aa" : "#2563eb"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

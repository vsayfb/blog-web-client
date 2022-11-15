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
import { SendMessageToChat } from "./SendMessageToChat";

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

  async function initializeChat(e: any) {
    e.preventDefault();

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
      style={{ height: "500px" }}
    >
      <div className="w-full">
        <ChatTitle
          image={targetUser.image || ""}
          title={targetUser.display_name}
          colors={colors}
          theme={theme}
        />

        {/* SPACE  */}

        <div className="" style={{ paddingTop: "13rem" }}>
          {" "}
        </div>

        <form
          className="w-full py-3 px-3 flex items-center justify-between border-t  "
          onSubmit={initializeChat}
        >
          {/* <ChatImageSvg /> */}

          <input
            placeholder="Send message"
            className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
            type="text"
            name="message"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            autoFocus={true}
            required={true}
          />

          <button type="submit">
            <ChatSendMessageSvg fill={"current"} />
          </button>
        </form>
      </div>
    </div>
  );
};

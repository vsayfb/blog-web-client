import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { sendRequest } from "../../lib/sendRequest";
import {
  addNewChat,
  resetFoundUser,
  setOpenedChatID,
  setSearchingUsersForChat,
} from "../slices/inboxSlice";
import { ChatSendMessageSvg } from "../svgs/ChatSendMessageSvg";
import { ChatViewDto } from "../types/chat-view-dto";
import { ChatTitle } from "./ChatTitle";

export const InitiliazeChat = ({
  targetUser,
}: {
  targetUser: AccountViewDto;
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
      `chats/with_account/${targetUser.id}`,
      "post",
      true,
      {
        first_message: firstMessage,
      }
    );

    dispatch(setOpenedChatID(data.id));

    dispatch(addNewChat(data));

    dispatch(setSearchingUsersForChat(false));
  }

  return (
    <div className={`col-span-2`} style={{ height: "500px" }}>
      <div className="w-full">
        <ChatTitle
          image={targetUser.image || ""}
          title={targetUser.display_name}
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

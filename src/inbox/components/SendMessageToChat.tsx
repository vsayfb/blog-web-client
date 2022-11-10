import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { ChatImageSvg } from "../svgs/ChatImageSvg";
import { ChatSendMessageSvg } from "../svgs/ChatSendMessageSvg";

export const SendMessageToChat = ({ chatID }: { chatID: string }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  async function sendMessageToChat() {
    try {
      await sendRequest(`messages/to/${chatID}`, "post", true, { content });

      setContent("");
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  }

  async function sendMessage() {
    await sendMessageToChat();
  }

  return (
    <div className="w-full py-3 px-3 flex items-center justify-between border-t ">
      {/* <ChatImageSvg /> */}

      <input
        placeholder="Send message"
        className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
        type="text"
        name="message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button onClick={() => sendMessage()}>
        <ChatSendMessageSvg fill={"#2563eb"} />
      </button>
    </div>
  );
};

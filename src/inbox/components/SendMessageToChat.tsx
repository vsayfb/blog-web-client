import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { addMessageToChat } from "../slices/inboxSlice";
import { ChatImageSvg } from "../svgs/ChatImageSvg";
import { ChatSendMessageSvg } from "../svgs/ChatSendMessageSvg";
import { ChatMessageViewDto } from "../types/chat-message-view.dto";

export const SendMessageToChat = ({ chatID }: { chatID: string }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  async function sendMessageToChat() {
    try {
      const { data: message }: { data: ChatMessageViewDto } = await sendRequest(
        `messages/to/${chatID}`,
        "post",
        true,
        { content }
      );

      dispatch(addMessageToChat(message));

      setContent("");
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  }

  async function sendMessage() {
    await sendMessageToChat();
  }

  return (
    <div className="w-full py-3 px-3 flex items-center justify-between border-t border-orange-200">
      <ChatImageSvg />

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
        <ChatSendMessageSvg />
      </button>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { ChatImageSvg } from "../svgs/ChatImageSvg";
import { ChatSendMessageSvg } from "../svgs/ChatSendMessageSvg";

export const SendMessageToChat = ({ chatID }: { chatID: string }) => {
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);

  const [content, setContent] = useState("");

  useEffect(() => {
    scrollToBottom();
  }, []);

  async function sendMessageToChat() {
    try {
      await sendRequest(`messages/to/${chatID}`, "post", true, { content });

      setContent("");
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
    }
  }

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    console.log(messagesEndRef);
  };

  async function sendMessage(e: any) {
    e.preventDefault();
    await sendMessageToChat();
    scrollToBottom();
  }

  return (
    <form
      className="w-full py-3 px-3 flex items-center justify-between border-t "
      onSubmit={sendMessage}
    >
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

      <button ref={messagesEndRef} type="submit">
        <ChatSendMessageSvg fill={"current"} />
      </button>
    </form>
  );
};

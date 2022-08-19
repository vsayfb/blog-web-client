import { ChatImageSvg } from "../svgs/ChatImageSvg";
import { ChatSendMessageSvg } from "../svgs/ChatSendMessageSvg";

export const SendMessageToChat = () => {
  return (
    <div className="w-full py-3 px-3 flex items-center justify-between border-t border-orange-200">
      <ChatImageSvg />

      <input
        placeholder="Send message"
        className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
        type="text"
        name="message"
        required
      />

      <ChatSendMessageSvg />
    </div>
  );
};

import { ChatMessage } from "./ChatMessage";
import { ChatTitle } from "./ChatTitle";
import { SendMessageToChat } from "./SendMessageToChat";

export const Chat = () => {
  return (
    <div className="col-span-2 bg-zinc-900">
      <div className="w-full">
        <ChatTitle />
        <div className="w-full overflow-y-auto p-4 relative">
          <ul>
            <li>
              <ChatMessage position="left" />
              <ChatMessage position="right" />
            </li>
          </ul>
        </div>

        <SendMessageToChat />
      </div>
    </div>
  );
};

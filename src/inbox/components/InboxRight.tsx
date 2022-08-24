import { useSelector } from "react-redux";
import { MessageSVG } from "../../lib/svgs/MessageSVG";
import { RootState } from "../../store";
import { Chat } from "./Chat";
import { InitiliazeChat } from "./InitializeChat";

export const InboxRight = () => {
  const { chats, chatID, foundUser } = useSelector(
    (state: RootState) => state.inbox
  );

  if (chatID) return <Chat chatID={chatID} />;
  else if (foundUser) return <InitiliazeChat targetUser={foundUser} />;
  else if (!chats.length)
    return (
      <div className="p-28 col-span-2">
        <div className="flex justify-center">
          <MessageSVG w={54} h={54} />
        </div>
        <h3 className="text-white text-center">No messages.</h3>
      </div>
    );
  else return <Chat chatID={chats[0].id} />;
};

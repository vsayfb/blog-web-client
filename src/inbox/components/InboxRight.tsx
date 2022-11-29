import { useSelector } from "react-redux";
import { MessageSVG } from "../../lib/svgs/MessageSVG";
import { RootState } from "../../store";
import { OpenedChat } from "./OpenedChat";
import { InitiliazeChat } from "./InitializeChat";

export const InboxRight = ({}: {}) => {
  const { chats, openedChatID, foundUser } = useSelector(
    (state: RootState) => state.inbox
  );

  if (openedChatID) {
    return <OpenedChat chatID={openedChatID} />;
  } else if (foundUser) return <InitiliazeChat targetUser={foundUser} />;
  else if (!chats.length)
    return (
      <div className="p-28 col-span-2">
        <div className="flex justify-center">
          <MessageSVG w={54} h={54} />
        </div>
        <h3 className={` text-center`}>No messages.</h3>
      </div>
    );
  else return <OpenedChat chatID={chats[0].id} />;
};

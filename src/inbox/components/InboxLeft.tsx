import { InboxState } from "../slices/inboxSlice";
import { Chats } from "./Chats";
import { FoundForChatList } from "./FoundForChatList";
import { SearchForChat } from "./SearchForChat";

export const InboxLeft = ({ inbox }: { inbox: InboxState }) => {
  return (
    <div className="col-span-1  border-r border-orange-200">
      <SearchForChat />

      {inbox.searchingUsersForChat ? (
        <FoundForChatList accounts={inbox.foundForChat} />
      ) : (
        <Chats chats={inbox.chats} />
      )}
    </div>
  );
};

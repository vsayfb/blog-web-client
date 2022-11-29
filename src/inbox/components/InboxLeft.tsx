import { InboxState } from "../slices/inboxSlice";
import { Chats } from "./Chats";
import { FoundForChatList } from "./FoundForChatList";
import { SearchForChat } from "./SearchForChat";

export const InboxLeft = ({ inbox }: { inbox: InboxState }) => {
  return (
    <div>
      <SearchForChat />

      {inbox.searchingUsersForChat ? (
        <FoundForChatList accounts={inbox.foundForChat} />
      ) : (
        <Chats chats={inbox.chats} />
      )}
    </div>
  );
};

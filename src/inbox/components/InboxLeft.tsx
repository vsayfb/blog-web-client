import { AppColors } from "../../lib/slices/appSlice";
import { InboxState } from "../slices/inboxSlice";
import { Chats } from "./Chats";
import { FoundForChatList } from "./FoundForChatList";
import { SearchForChat } from "./SearchForChat";

export const InboxLeft = ({
  inbox,
  colors,
  theme,
}: {
  inbox: InboxState;
  colors: AppColors;
  theme: string;
}) => {
  return (
    <div
      className={`col-span-1  border-r border ${
        theme === "dark"
          ? "border-" + colors.orange200
          : "border-" + colors.blue400
      }`}
    >
      <SearchForChat colors={colors} theme={theme} />

      {inbox.searchingUsersForChat ? (
        <FoundForChatList
          accounts={inbox.foundForChat}
          colors={colors}
          theme={theme}
        />
      ) : (
        <Chats chats={inbox.chats} colors={colors} theme={theme} />
      )}
    </div>
  );
};

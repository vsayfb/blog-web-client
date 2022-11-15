import { useSelector } from "react-redux";
import { MessageSVG } from "../../lib/svgs/MessageSVG";
import { RootState } from "../../store";
import { OpenedChat } from "./OpenedChat";
import { InitiliazeChat } from "./InitializeChat";
import { AppColors } from "../../lib/slices/appSlice";

export const InboxRight = ({
  colors,
  theme,
}: {
  colors: AppColors;
  theme: string;
}) => {
  const { chats, openedChatID, foundUser } = useSelector(
    (state: RootState) => state.inbox
  );

  if (openedChatID) {
    return <OpenedChat chatID={openedChatID} colors={colors} theme={theme} />;
  } else if (foundUser)
    return (
      <InitiliazeChat targetUser={foundUser} colors={colors} theme={theme} />
    );
  else if (!chats.length)
    return (
      <div className="p-28 col-span-2">
        <div className="flex justify-center">
          <MessageSVG w={54} h={54} />
        </div>
        <h3
          className={`${
            theme === "dark"
              ? "text-" + colors.zinc50
              : "text-" + colors.zinc900
          } text-center`}
        >
          No messages.
        </h3>
      </div>
    );
  else return <OpenedChat chatID={chats[0].id} colors={colors} theme={theme} />;
};

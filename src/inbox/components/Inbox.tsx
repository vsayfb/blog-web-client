import { useSelector } from "react-redux";
import { AppColors } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { InboxLeft } from "./InboxLeft";
import { InboxRight } from "./InboxRight";

export const Inbox = ({
  colors,
  theme,
}: {
  colors: AppColors;
  theme: string;
}) => {
  const inbox = useSelector((state: RootState) => state.inbox);

  if (!inbox.inboxVisibility) return null;

  return (
    <div className="absolute right-0 border-r border-l border-b border-collapse border-blue-600 shadow-lg shadow-zinc-600">
      <div
        className={`w-50 z-50 ${
          theme === "dark" ? "bg-" + colors.zinc900 : "bg-" + colors.zinc50
        }`}
      >
        <div className="grid grid-cols-3 min-w-full rounded">
          <InboxLeft inbox={inbox} colors={colors} theme={theme} />
          <InboxRight colors={colors} theme={theme} />
        </div>
      </div>
    </div>
  );
};

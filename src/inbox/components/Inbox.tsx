import { useEffect } from "react";
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
    <div
      className="h-screen w-screen fixed "
      style={{
        backdropFilter: "blur(23px)",
        zIndex: "999999",
      }}
    >
      <div className="fixed right-2 900 border-2 border-zinc-900">
        <div
          className={`relative w-50 z-50 ${
            theme === "dark" ? "bg-" + colors.zinc900 : "bg-" + colors.zinc50
          }`}
        >
          <div className="grid grid-cols-3 min-w-full rounded">
            <InboxLeft inbox={inbox} colors={colors} theme={theme} />
            <InboxRight colors={colors} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { InboxLeft } from "./InboxLeft";
import { InboxRight } from "./InboxRight";

export const Inbox = ({}: {}) => {
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
        <div className={`relative w-50 z-50 `}>
          <div className="grid grid-cols-3 min-w-full rounded">
            <InboxLeft inbox={inbox} />
            <InboxRight />
          </div>
        </div>
      </div>
    </div>
  );
};

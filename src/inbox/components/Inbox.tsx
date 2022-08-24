import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { InboxLeft } from "./InboxLeft";
import { InboxRight } from "./InboxRight";

export const Inbox = () => {
  const inbox = useSelector((state: RootState) => state.inbox);

  if (!inbox.inboxVisibility) return null;

  return (
    <div className="absolute right-0 ">
      <div className="w-50 bg-zinc-900">
        <div className="grid grid-cols-3 min-w-full rounded">
          <InboxLeft inbox={inbox} />
          <InboxRight />
        </div>
      </div>
    </div>
  );
};

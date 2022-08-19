import { useSelector } from "react-redux";
import { SearchBarSvg } from "../../lib/svgs/SearchBarSvg";
import { RootState } from "../../store";
import { Chat } from "./Chat";
import { Chats } from "./Chats";

export const Inbox = () => {
  const { inboxVisibility } = useSelector((state: RootState) => state.chats);

  if (!inboxVisibility) return null;

  return (
    <div className="absolute right-0 ">
      <div className="w-50 bg-zinc-900">
        <div className="grid grid-cols-3 min-w-full rounded">
          <div className="col-span-1  border-r border-orange-200">
            <div className="my-3 mx-3 ">
              <div className="relative text-orange-200 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SearchBarSvg />
                </span>
                <input
                  placeholder="Find a user to chat"
                  className="py-2 pl-10 block w-full rounded bg-zinc-900 outline-none focus:text-orange-200"
                  type="search"
                  name="search"
                  required
                  autoComplete="search"
                />
              </div>
            </div>
            <Chats />
          </div>

          <Chat />
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { SearchBarSvg } from "../../lib/svgs/SearchBarSvg";
import { RootState } from "../../store";
import {
  resetFoundUser,
  resetFoundUsers,
  setFoundUsers,
  setSearchingUsersForChat,
} from "../slices/inboxSlice";

export const SearchForChat = () => {
  const { chats } = useSelector((state: RootState) => state.inbox);
  const { me } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState<undefined | string>();
  const dispatch = useDispatch();

  async function searchUser() {
    const { data }: { data: AccountViewDto[] } = await sendRequest(
      `accounts/search_by_username?username=${username}`,
      "get",
      true
    );

    return data;
  }

  useEffect(() => {
    if (typeof username === "string" && username.length == 0) {
      dispatch(resetFoundUser());
      dispatch(resetFoundUsers());
      dispatch(setSearchingUsersForChat(false));
    }

    if (typeof username === "string" && username.length >= 2) {
      searchUser()
        .then((foundUsers) => {
          dispatch(setSearchingUsersForChat(true));

          let members: AccountViewDto[] = [];

          // bi-directional chats
          const twoMembersChats = chats.filter((c) => c.members.length == 2);

          twoMembersChats.map((c) =>
            c.members.map((m) => {
              if (m.id !== me.sub) members.push(m);
            })
          );

          const filteredFoundUsers = foundUsers.filter(
            (user) => !members.some((member) => member.id === user.id)
          );

          dispatch(setFoundUsers(filteredFoundUsers));
        })
        .catch((err) => {
          dispatch(setError(err.message));
        });
    }
  }, [username]);

  return (
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
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { sendRequest } from "../../lib/sendRequest";
import { AppColors, setError } from "../../lib/slices/appSlice";
import { SearchBarSvg } from "../../lib/svgs/SearchBarSvg";
import { RootState } from "../../store";
import {
  resetFoundUser,
  resetFoundUsers,
  setFoundUsers,
  setSearchingUsersForChat,
} from "../slices/inboxSlice";

export const SearchForChat = ({
  colors,
  theme,
}: {
  colors: AppColors;
  theme: string;
}) => {
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

    if (typeof username === "string" && username.length >= 1) {
      searchUser().then((foundUsers) => {
        dispatch(setSearchingUsersForChat(true));

        let members: AccountViewDto[] = [];

        // bi-directional chats
        const twoMembersChats = chats.filter((c) => c.members.length == 2);

        twoMembersChats.map((c) =>
          c.members.map((m) => {
            if (m.id !== me.sub) members.push(m);
          })
        );

        // show only non-chatted users
        const filteredFoundUsers = foundUsers
          .filter((user) => !members.some((member) => member.id === user.id))
          .filter((u) => u.username !== me.username);

        dispatch(setFoundUsers(filteredFoundUsers));
      });
    }
  }, [username]);

  return (
    <div className="my-3 mx-3 ">
      <div
        className={`relative ${
          theme === "dark"
            ? "text-" + colors.orange200 + " focus-within:text-gray-400"
            : "text-" + colors.zinc900 + " focus-within:text-gray-400"
        } `}
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <SearchBarSvg />
        </span>
        <input
          placeholder="Find a user to chat"
          className={`py-2 pl-10 block w-full rounded ${
            theme === "dark"
              ? "bg-" + colors.zinc900 + " focus:text-" + colors.orange200
              : "bg-" + colors.blue400 + " focus:text-" + colors.zinc50
          }   outline-none `}
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

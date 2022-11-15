import { useDispatch } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { detectImage } from "../../lib/detectImage";
import { AppColors } from "../../lib/slices/appSlice";
import {
  resetOpenedChat,
  resetOpenedChatID,
  setFoundUser,
} from "../slices/inboxSlice";

export const FoundForChatList = ({
  accounts,
  colors,
  theme,
}: {
  accounts: AccountViewDto[];
  colors: AppColors;
  theme: string;
}) => {
  const dispatch = useDispatch();

  if (!accounts.length)
    return <h3 className="ml-4">Could not find an account.</h3>;

  return (
    <>
      {accounts.map((a) => (
        <li
          key={a.id}
          className="list-none"
          onClick={() => {
            dispatch(resetOpenedChatID());
            dispatch(resetOpenedChat());
            dispatch(setFoundUser(a));
          }}
        >
          <a
            className={`border-b px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none transition duration-150 ease-in-out  ${
              theme === "dark"
                ? "text-" +
                  colors.zinc900 +
                  " border-" +
                  colors.orange200 +
                  " hover:bg-" +
                  colors.orange200 +
                  " hover:text-" +
                  colors.zinc900
                : "text-" +
                  colors.zinc900 +
                  " border-" +
                  colors.zinc900 +
                  " hover:bg-" +
                  colors.blue400 +
                  " hover:text-" +
                  colors.zinc50
            }`}
          >
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={detectImage(a.image)}
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="block pl-2 ml-2 font-semibold text-base">
                  {a.display_name}
                </span>
                <span className="block ml-2 text-sm "></span>
              </div>
              {/* <span className="block ml-2 text-sm ">I am the danger!</span> */}
            </div>
          </a>
        </li>
      ))}
    </>
  );
};

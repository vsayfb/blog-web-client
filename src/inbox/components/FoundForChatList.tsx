import { useDispatch } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { resetChat, resetChatID, setFoundUser } from "../slices/inboxSlice";

export const FoundForChatList = ({
  accounts,
}: {
  accounts: AccountViewDto[];
}) => {
  const dispatch = useDispatch();

  if (!accounts.length) return null;

  return (
    <>
      {accounts.map((a) => (
        <li
          key={a.id}
          onClick={() => {
            dispatch(resetChatID());
            dispatch(resetChat());

            dispatch(setFoundUser(a));
          }}
        >
          <a className="hover:bg-orange-200 hover:text-black text-white border-b border-orange-200 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-orange-200 transition duration-150 ease-in-out">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={a.image || ""}
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

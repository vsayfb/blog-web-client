import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { setChats, setChatID } from "../slices/inboxSlice";
import { ChatViewDto } from "../types/chat-view-dto";

export const Chats = ({ chats }: { chats: ChatViewDto[] }) => {
  const { me } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  async function getChats() {
    const { data } = await sendRequest("chats/me", "get", true);

    return data;
  }

  useEffect(() => {
    getChats()
      .then((chats) => {
        dispatch(setChats(chats));
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (!chats.length) return null;

  return (
    <ul className="overflow-auto">
      <h2 className="ml-2 mb-2 text-orange-200 text-lg my-2">Chats</h2>

      {chats.map((c) => {
        const targetUser = c.members.find((m) => m.id !== me.sub);

        return (
          <li key={c.id} onClick={() => dispatch(setChatID(c.id))}>
            <a className="hover:bg-orange-200 hover:text-black text-white border-b border-orange-200 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-orange-200 transition duration-150 ease-in-out">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={targetUser?.image || ""}
                alt="username"
              />
              <div className="w-full pb-2">
                <div className="flex justify-between">
                  <span className="block pl-2 ml-2 font-semibold text-base">
                    {targetUser?.display_name}
                  </span>
                  <span className="block ml-2 text-sm ">
                    {new Date(c.updated_at).toLocaleDateString()}
                  </span>
                </div>
                {/* <span className="block ml-2 text-sm ">I am the danger!</span> */}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

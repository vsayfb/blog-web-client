import { Me, setMe } from "../../../lib/slices/authSlice";
import { detectImage } from "../../../lib/detectImage";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const UserMenuArea = ({ me }: { me: Me }) => {
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);

  const dispatch = useDispatch();

  function logout() {
    dispatch(setMe({ username: "" }));
    localStorage.removeItem("token");
  }

  return (
    <div className="ml-3 relative">
      <div>
        <img
          onClick={() => setUserMenuVisibility(!userMenuVisibility)}
          className="h-7 w-7 rounded-full cursor-pointer"
          src={detectImage(me.image)}
          alt=""
        />
      </div>

      {/* USER MENU */}
      {userMenuVisibility ? (
        <div
          className=" origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Your Profile
          </a>

          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-1"
          >
            Settings
          </a>

          <button
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            onClick={() => logout()}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
};

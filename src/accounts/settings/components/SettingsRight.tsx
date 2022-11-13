import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMe } from "../../../auth/slices/authSlice";
import { InputField } from "../../../lib/components/InputField";
import { RootState } from "../../../store";
import { UpdateDisplayName } from "./UpdateDisplayName";
import { UpdatePassword } from "./UpdatePassword";
import { UpdatePublicProfile } from "./UpdatePublicProfile";
import { UpdateUsername } from "./UpdateUsername";

export const SettingsRight = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState<"public" | "security">("public");

  const { me } = useSelector((state: RootState) => state.auth);

  return (
    <div className="relative col-span-12  space-y-6 sm:col-span-9">
      <div className="flex items-center ">
        <button
          className={`ml-4 px-5 py-1 border-b-2 ${
            tab === "public" && "border-emerald-500"
          } `}
          onClick={() => setTab("public")}
        >
          Public Profile
        </button>
        <button
          className={`ml-4 px-5 py-1 border-b-2  ${
            tab === "security" && "border-emerald-500"
          } `}
          onClick={() => setTab("security")}
        >
          Security
        </button>
      </div>

      {tab === "public" ? <UpdatePublicProfile /> : <UpdatePassword />}
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setAccount } from "../slices/settingsSlice";
import { Account, AccountDto } from "./account/Account";
import { UpdatePublicProfile } from "./profile/UpdatePublicProfile";
import { Security } from "./security/Security";

export const SettingsRight = () => {
  const [tab, setTab] = useState<"public" | "account" | "security" | "social">(
    "public"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest("accounts/me", "get", true).then(
      (result: { data: AccountDto }) => {
        dispatch(setAccount(result.data));
      }
    );
  }, []);

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
          className={`ml-4 px-5 py-1 border-b-2 ${
            tab === "account" && "border-emerald-500"
          } `}
          onClick={() => setTab("account")}
        >
          Account
        </button>
        <button
          className={`ml-4 px-5 py-1 border-b-2  ${
            tab === "security" && "border-emerald-500"
          } `}
          onClick={() => setTab("security")}
        >
          Security
        </button>
        <button
          className={`ml-4 px-5 py-1 border-b-2 ${
            tab === "social" && "border-emerald-500"
          } `}
          onClick={() => setTab("social")}
        >
          Social
        </button>
      </div>

      {tab === "public" ? (
        <UpdatePublicProfile />
      ) : tab === "security" ? (
        <Security />
      ) : tab === "account" ? (
        <Account />
      ) : null}
    </div>
  );
};

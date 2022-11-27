import { useState } from "react";
import { UpdatePassword } from "./UpdatePassword";
import { UpdatePublicProfile } from "./UpdatePublicProfile";

export const SettingsRight = () => {
  const [tab, setTab] = useState<"public" | "security">("public");

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

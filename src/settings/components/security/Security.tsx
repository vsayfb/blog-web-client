import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { TwoFactorAuth } from "../tfa/TwoFactorAuth";
import { UpdateGoogleAccountPassword } from "./UpdateGoogleAccountPassword";
import { UpdatePassword } from "./UpdatePassword";

export const Security = () => {
  const { account } = useSelector((state: RootState) => state.settings);

  return (
    <div className="mt-5">
      <TwoFactorAuth />

      <div className="mt-8">
        <h4 className="text-orange-400">Update Password</h4>

        {account?.via === "local" ? (
          <UpdatePassword />
        ) : (
          <UpdateGoogleAccountPassword />
        )}
      </div>
    </div>
  );
};

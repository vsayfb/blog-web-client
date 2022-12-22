import { TwoFactorAuth } from "../tfa/TwoFactorAuth";
import { UpdatePassword } from "./UpdatePassword";

export const Security = () => {
  return (
    <div className="mt-5">
      <TwoFactorAuth />

      <div className="mt-8">
        <h4 className="text-orange-400">Update Password</h4>

        <UpdatePassword />
      </div>
    </div>
  );
};

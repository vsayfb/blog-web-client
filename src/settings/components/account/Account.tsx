import { useState } from "react";
import Spinner from "../../../lib/components/Spinner";
import { AccountViewDto } from "../../../accounts/types/account-view-dto";
import { AccountEmail } from "./AccountEmail";
import { AccountMobilePhone } from "./AccountMobilePhone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  setEmailToAccount,
  setMobilePhoneToAccount,
} from "../../slices/settingsSlice";
import { TwoFactorAuthDto } from "../tfa/TwoFactorAuth";

export type RegisteredVia = "local" | "google";

export type AccountDto = AccountViewDto & {
  via: RegisteredVia;
  mobile_phone: string | null;
  two_factor_auth: null | TwoFactorAuthDto["data"];
  email: string | null;
};

export const Account = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { account } = useSelector((state: RootState) => state.settings);

  if (account) {
    if (account.via === "google") {
      return (
        <div className="mt-4">
          <AccountMobilePhone account={account} />
        </div>
      );
    }

    return (
      <div>
        <div>
          <AccountEmail account={account} />
        </div>

        <div className="mt-12">
          <AccountMobilePhone account={account} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Spinner />
    </div>
  );
};

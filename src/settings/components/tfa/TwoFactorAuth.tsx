import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../lib/components/Spinner";
import { sendRequest } from "../../../lib/sendRequest";
import { RootState } from "../../../store";
import { setTFA } from "../../slices/settingsSlice";
import { DisableTFA } from "./DisableTFA";
import { EnableTfaForGoogleAccount } from "./EnableTfaForGoogleAccount";
import { EnableTfaForLocalAccount } from "./EnableTfaForLocalAccount";

export type TwoFactorAuthDto = {
  data: {
    id: string;
    via: "email" | "mobile_phone";
    created_at: string;
    updated_at: string;
  };
};

export const TwoFactorAuth = () => {
  const dispatch = useDispatch();

  const { tfa } = useSelector((state: RootState) => state.settings);

  const { account } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (!tfa) {
      sendRequest(`accounts/2fa/me`, "get", true).then(
        (value: TwoFactorAuthDto) => {
          dispatch(setTFA(value.data));
        }
      );
    }
  }, []);

  if (!account) return null;

  return (
    <div>
      <h4 className="text-orange-400">Protect your account</h4>

      <div className="mt-4">
        {account.via === "local" ? (
          tfa === null ? (
            <EnableTfaForLocalAccount account={account} />
          ) : (
            <DisableTFA tfa={tfa} />
          )
        ) : account.via === "google" ? (
          tfa === null ? (
            <EnableTfaForGoogleAccount account={account} />
          ) : (
            <DisableTFA tfa={tfa} />
          )
        ) : null}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import Spinner from "../../../../lib/components/Spinner";
import { sendRequest } from "../../../../lib/sendRequest";
import { AccountDto } from "../account/Account";
import { DisableTFA } from "./DisableTFA";
import { EnableTFA } from "./EnableTFA";

export type TwoFactorAuthDto = {
  data: {
    id: string;
    via: "email" | "mobil_phone";
    created_at: string;
    updated_at: string;
  };
};

export const TwoFactorAuth = () => {
  const [TFA, setTFA] = useState<TwoFactorAuthDto["data"] | null>(null);

  const [account, setAccount] = useState<AccountDto | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    sendRequest(`accounts/me`, "get", true)
      .then((value) => {
        setAccount(value.data);

        sendRequest(`security/2fa/me`, "get", true).then((value) => {
          setTFA(value.data);
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-4">
        <Spinner />
      </div>
    );

  return (
    <div>
      <h4 className="text-orange-400">Protect your account</h4>

      <div className="mt-4">
        {TFA === null ? (
          <EnableTFA setTFA={setTFA} />
        ) : (
          <DisableTFA
            tfa={TFA}
            setTFA={setTFA}
            account={account as unknown as AccountDto}
          />
        )}
      </div>
    </div>
  );
};

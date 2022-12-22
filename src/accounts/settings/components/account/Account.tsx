import { useEffect, useState } from "react";
import Spinner from "../../../../lib/components/Spinner";
import { sendRequest } from "../../../../lib/sendRequest";
import { AccountViewDto } from "../../../types/account-view-dto";
import { AccountEmail } from "./AccountEmail";
import { AccountMobilPhone } from "./AccountMobilPhone";

export type AccountDto = AccountViewDto & {
  via: "local" | "google";
  mobil_phone: string | null;
  email: string | null;
};

export const Account = () => {
  const [loading, setLoading] = useState(false);

  const [account, setAccount] = useState<AccountDto | null>(null);

  useEffect(() => {
    sendRequest(`accounts/me`, "get", true)
      .then((value) => {
        setAccount(value.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (account) {
    return (
      <div>
        <div>
          <AccountEmail account={account} setAccount={setAccount as any} />
        </div>

        <div className="mt-4">
          <AccountMobilPhone account={account} setAccount={setAccount as any} />
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

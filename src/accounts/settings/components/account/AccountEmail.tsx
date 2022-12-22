import React from "react";
import { InputField } from "../../../../lib/components/InputField";
import { AccountDto } from "./Account";

export const AccountEmail = ({
  account,
  setAccount,
}: {
  account: AccountDto;
  setAccount: React.Dispatch<React.SetStateAction<AccountDto>>;
}) => {
  return (
    <InputField
      value={account.email || ""}
      labelText={account.email ? "Your email" : "You have not an email."}
      onChangeEvent={(e) =>
        setAccount((p) => ({ ...p, email: e.target.value }))
      }
    />
  );
};

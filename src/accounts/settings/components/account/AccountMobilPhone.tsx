import React from "react";
import { InputField } from "../../../../lib/components/InputField";
import { AccountDto } from "./Account";

export const AccountMobilPhone = ({
  account,
  setAccount,
}: {
  account: AccountDto;
  setAccount: React.Dispatch<React.SetStateAction<AccountDto>>;
}) => {
  return (
    <InputField
      value={account.mobil_phone || ""}
      labelText={
        account.mobil_phone
          ? "Your mobil phone number"
          : "You have not a mobil phone number."
      }
      onChangeEvent={(e) =>
        setAccount((p) => ({ ...p, mobil_phone: e.target.value }))
      }
    />
  );
};

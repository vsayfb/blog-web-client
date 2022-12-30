import { createSlice } from "@reduxjs/toolkit";
import { AccountDto } from "../components/account/Account";
import { TwoFactorAuthDto } from "../components/tfa/TwoFactorAuth";

export type SettingsTypes = {
  account: null | AccountDto;
  tfa: null | TwoFactorAuthDto["data"];
};

const settingsInitialState: SettingsTypes = {
  tfa: null,
  account: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsInitialState,
  reducers: {
    setTFA: (state, action: { payload: TwoFactorAuthDto["data"] | null }) => {
      state.tfa = action.payload;
    },
    setAccount: (state, action: { payload: AccountDto }) => {
      state.account = action.payload;
    },
    setEmailToAccount: (state, action: { payload: string | null }) => {
      if (state.account) {
        state.account.email = action.payload;
      }
    },
    setMobilePhoneToAccount: (state, action: { payload: string | null }) => {
      if (state.account) {
        state.account.mobile_phone = action.payload;
      }
    },
  },
});

export const {
  setAccount,
  setTFA,
  setEmailToAccount,
  setMobilePhoneToAccount,
} = settingsSlice.actions;

export default settingsSlice.reducer;

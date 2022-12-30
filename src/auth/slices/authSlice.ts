import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyCredentials } from "../../lib/api/account";

export type Me = {
  username: string;
  image: string;
  display_name: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
};

export type LocalRegisterDto = {
  username: string;
  displayName: string;
  password: string;
  mobile_phone: string | null;
  email: string | null;
};

export type LocalRegisterResponseDto = {
  access_token: string;
  account: {
    username: string;
    display_name: string;
    image: string;
    created_at: string;
  };
};

const initialState: {
  me: Me;
  updatedMe: {
    username: string;
    display_name: string;
    validationError: boolean;
  };
  localRegisterData: LocalRegisterDto;
  localRegisterVerificationCode: {
    token: string;
    code: string;
  };
  googleAccessToken: string;
  localRegisterStep: number;
  tfaEnabled: boolean;
  tfaData: {
    verification_token: string;
    via: "email" | "mobile phone";
  };
  pending: boolean;
} = {
  me: {
    username: "",
    image: "",
    display_name: "",
    sub: "",
    role: "user",
    iat: 0,
    exp: 0,
  },
  updatedMe: {
    username: "",
    display_name: "",
    validationError: true,
  },
  localRegisterData: {
    username: "",
    displayName: "",
    email: null,
    mobile_phone: null,
    password: "",
  },
  localRegisterVerificationCode: {
    code: "",
    token: "",
  },
  googleAccessToken: "",
  localRegisterStep: 1,
  pending: false,
  tfaEnabled: false,
  tfaData: {
    verification_token: "",
    via: "email",
  },
};

export const getMe = createAsyncThunk("auth/me", async () => {
  const data = await getMyCredentials();

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.me = { ...state.me, ...action.payload };
    },
    setUpdatedMe: (state, action: { payload: Record<string, any> }) => {
      state.updatedMe = { ...state.updatedMe, ...action.payload };
    },
    setLocalRegisterData: (
      state,
      action: { payload: Record<string, string> }
    ) => {
      state.localRegisterData = {
        ...state.localRegisterData,
        ...action.payload,
      };
    },
    setLocalRegisterVerificationCode: (
      state,
      action: { payload: Record<string, string> }
    ) => {
      state.localRegisterVerificationCode = {
        ...state.localRegisterVerificationCode,
        ...action.payload,
      };
    },
    nextLocalRegisterStep: (state) => {
      state.localRegisterStep++;
    },
    backLocalRegisterStep: (state) => {
      state.localRegisterStep--;
    },
    setTfaEnabled: (state, action: { payload: boolean }) => {
      state.tfaEnabled = true;
    },
    setTfaData: (
      state,
      action: {
        payload: {
          verification_token: string;
          via: "email" | "mobile phone";
        };
      }
    ) => {
      state.tfaData = action.payload;
    },
    setGoogleAccessToken: (state, action: { payload: string }) => {
      state.googleAccessToken = action.payload;
    },
    setPictureToMe: (state, action) => {
      state.me.image = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state, action) => {
      state.pending = true;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.me = action.payload;
      state.pending = false;
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.pending = false;
    });
  },
});

export const {
  setMe,
  setUpdatedMe,
  setPictureToMe,
  nextLocalRegisterStep,
  backLocalRegisterStep,
  setLocalRegisterVerificationCode,
  setLocalRegisterData,
  setGoogleAccessToken,
  setTfaEnabled,
  setTfaData,
} = authSlice.actions;

export default authSlice.reducer;

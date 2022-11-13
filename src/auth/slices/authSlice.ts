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

const initialState: {
  me: Me;
  updatedMe: {
    username: string;
    display_name: string;
    validationError: boolean;
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

  pending: false,
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

export const { setMe, setUpdatedMe, setPictureToMe } = authSlice.actions;

export default authSlice.reducer;

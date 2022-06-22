import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyCredentials } from "../api/account";

export type Me = {
  username: string;
  image: string;
};

const initialState: { me: Me; pending: boolean } = {
  me: { username: "", image: "" },
  pending: false,
};

export const getMe = createAsyncThunk(
  "auth/me",
  async () => await getMyCredentials()
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.me = { ...state.me, ...action.payload };
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

export const { setMe, setPictureToMe } = authSlice.actions;

export default authSlice.reducer;

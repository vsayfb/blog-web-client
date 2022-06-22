import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./lib/slices/appSlice";
import authSlice from "./lib/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

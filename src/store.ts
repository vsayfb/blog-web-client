import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./lib/slices/appSlice";
import authSlice from "./auth/slices/authSlice";
import postsSlice from "./posts/slices/postsSlice";
import tagsSlice from "./tags/slices/tagsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    posts: postsSlice,
    tags: tagsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

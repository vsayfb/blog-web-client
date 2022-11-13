import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./lib/slices/appSlice";
import authSlice from "./auth/slices/authSlice";
import postsSlice from "./posts/slices/postsSlice";
import tagsSlice from "./tags/slices/tagsSlice";
import commentsSlice from "./comments/slices/commentsSlice";
import inboxSlice from "./inbox/slices/inboxSlice";
import profileSlice from "./profile/slices/profileSlice";
import notificationSlice from "./notifications/slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    posts: postsSlice,
    tags: tagsSlice,
    comments: commentsSlice,
    inbox: inboxSlice,
    profile: profileSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

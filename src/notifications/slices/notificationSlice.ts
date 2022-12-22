import { createSlice } from "@reduxjs/toolkit";
import { AccountViewDto } from "../../accounts/types/account-view-dto";

type NotificationAction =
  | "commented on your post"
  | "liked your post"
  | "disliked your post"
  | "followed you"
  | "replied your comment"
  | "liked your comment"
  | "disliked your comment";

export type NotificationT = {
  id: string;
  action: NotificationAction;
  sender: AccountViewDto;
  seen: boolean;
  created_at: string;
  object: "follow" | "comment" | "reply";
};

const initialState: {
  notifications: NotificationT[];
  newNotification: any;
  notificationsCount: number;
  notificationAreaVisibility: boolean;
} = {
  notifications: [],
  newNotification: undefined,
  notificationsCount: 0,
  notificationAreaVisibility: false,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: { payload: NotificationT[] }) => {
      // a trick for seeing notifications sorted by date
      state.notifications = action.payload.reverse();
    },

    setNewNotification: (state, action: { payload: NotificationT }) => {
      state.newNotification = action.payload;
    },

    setNotificationCount: (state, action: { payload: number }) => {
      state.notificationsCount = action.payload;
    },

    increaseNotificationCount: (state) => {
      state.notificationsCount += 1;
    },

    resetNewNotification: (state) => {
      state.newNotification = null;
    },

    setNotificationAreaVisibility: (state, action: { payload: boolean }) => {
      state.notificationAreaVisibility = action.payload;
    },

    toggleNotificationAreaVisibility: (state) => {
      state.notificationAreaVisibility = !state.notificationAreaVisibility;
    },
  },
});

export default notificationSlice.reducer;

export const {
  setNewNotification,
  resetNewNotification,
  setNotifications,
  setNotificationAreaVisibility,
  setNotificationCount,
  increaseNotificationCount,
  toggleNotificationAreaVisibility,
} = notificationSlice.actions;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationSocket } from "../lib/slices/appSlice";
import {
  increaseNotificationCount,
  NotificationT,
  setNewNotification,
} from "../notifications/slices/notificationSlice";
import { RootState } from "../store";

export const NotificationSocket = () => {
  const dispatch = useDispatch();

  const { notificationsSocket } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    if (!notificationsSocket) {
      dispatch(setNotificationSocket());
    } else {
      notificationsSocket.on("notification", (notification: NotificationT) => {
        // notifications(contain new notification) have already filled when notification area opened
        dispatch(setNewNotification(notification));

        dispatch(increaseNotificationCount());
      });
    }
  }, [notificationsSocket]);

  return null;
};

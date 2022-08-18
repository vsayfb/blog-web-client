import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationSocket } from "../lib/slices/appSlice";
import { RootState } from "../store";

export const NotificationSocket = () => {
  const dispatch = useDispatch();

  const { notificationsSocket } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    if (!notificationsSocket) {
      dispatch(setNotificationSocket());
    } else {
      notificationsSocket.on("notification", (data: any) => {
        console.log(data);
      });
    }
  }, [notificationsSocket]);

  return null;
};

import { Navbar } from "./layouts/navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { AppRoutes } from "./routes/Routes";
import { ErrorAlert } from "./lib/components/ErrorAlert";
import { Sockets } from "./sockets/Sockets";
import { Inbox } from "./inbox/components/Inbox";
import { NotificationsArea } from "./notifications/components/NotificationsArea";
import { NewNotification } from "./notifications/components/NewNotification";
import { useEffect } from "react";
import { getMe } from "./auth/slices/authSlice";
import { FullScreenLoadingIcon } from "./lib/components/FullScreenLoadingIcon";

function App() {
  const { me } = useSelector((state: RootState) => state.auth);

  const { loading, theme, colors } = useSelector(
    (state: RootState) => state.app
  );

  const { notificationAreaVisibility, newNotification } = useSelector(
    (state: RootState) => state.notifications
  );

  const dispatch = useDispatch<AppDispatch>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) dispatch(getMe());
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={
        "1030114530292-3dh19g79549kt9p1lkp5j486himaofe3.apps.googleusercontent.com"
      }
    >
      <Sockets />

      {notificationAreaVisibility ? <NotificationsArea /> : null}

      {/* do not show the new notification in client for now */}

      {/* {newNotification ? (
        <NewNotification newNotification={newNotification} />
      ) : null} */}

      <Navbar colors={colors} theme={theme} />

      {me.username ? <Inbox colors={colors} theme={theme} /> : null}

      <ErrorAlert />

      {loading ? <FullScreenLoadingIcon /> : null}

      {<AppRoutes me={me} />}
    </GoogleOAuthProvider>
  );
}

export default App;

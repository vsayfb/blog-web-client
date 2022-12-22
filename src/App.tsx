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
import { WarnAlert } from "./lib/components/WarnAlert";
import { Footer } from "./lib/components/Footer";
import { FastSignUp } from "./auth/components/FastSignUp";
import { FastSignIn } from "./auth/components/FastSignIn";

export enum AppHashColors {
  RED = "#ad0003",
  EMERALD = "#10b981",
}

export function App() {
  const { me } = useSelector((state: RootState) => state.auth);

  const { loading, fastSignInVisibility, fastSignUpVisibility } = useSelector(
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
        "118335956263-gq5734b78mouab5msqtsva74r6g17gg4.apps.googleusercontent.com"
      }
    >
      <Sockets />

      {fastSignUpVisibility ? <FastSignUp /> : null}

      {fastSignInVisibility ? <FastSignIn /> : null}

      {notificationAreaVisibility ? <NotificationsArea /> : null}

      {newNotification ? (
        <NewNotification newNotification={newNotification} />
      ) : null}

      <Navbar />

      {me.username ? <Inbox /> : null}

      <ErrorAlert />

      <WarnAlert />

      {loading ? <FullScreenLoadingIcon /> : null}

      {<AppRoutes me={me} />}

      <Footer />
    </GoogleOAuthProvider>
  );
}

export default App;

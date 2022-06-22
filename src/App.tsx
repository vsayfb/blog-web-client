import { Navbar } from "./layouts/navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { LoadingWrapper } from "./lib/components/LoadingWrapper";
import { useEffect } from "react";
import { getMe } from "./lib/slices/authSlice";
import { AppRoutes } from "./routes/Routes";
import { ErrorAlert } from "./lib/components/ErrorAlert";

function App() {
  const { me } = useSelector((state: RootState) => state.auth);

  const { loading } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getMe());
    }
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={
        "1030114530292-3dh19g79549kt9p1lkp5j486himaofe3.apps.googleusercontent.com"
      }
    >
      <Navbar />

      <ErrorAlert />

      <LoadingWrapper loading={loading} />

      {<AppRoutes me={me} />}
    </GoogleOAuthProvider>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Main from "../screens/Main";
import { ProtectedRoute } from "../lib/components/ProtectedRoute";
import { Me } from "../auth/slices/authSlice";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { PublicPost } from "../screens/PublicPost";
import { WritePost } from "../screens/WritePost";
import { Dashboard } from "../dashboard/components/Dashboard";
import { UpdatePost } from "../screens/UpdatePost";
import { Post } from "../screens/Post";
import { NotFound } from "../screens/NotFound";
import { Profile } from "../profile/components/Profile";
import { Settings } from "../accounts/settings/components/Settings";
import { Tags } from "../tags/components/Tags";
import { Tag } from "../tags/components/Tag";
import SignInScreen from "../screens/SignIn";

export const AppRoutes = ({ me }: { me: Me }) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="signIn" element={<SignInScreen />} />
      <Route path="signUp" element={<SignUp />} />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute ifReturn={Boolean(me.username)}>
            <Dashboard me={me} />
          </ProtectedRoute>
        }
      />

      <Route
        path="write"
        element={
          <ProtectedRoute ifReturn={Boolean(me.username)}>
            <WritePost />
          </ProtectedRoute>
        }
      />

      <Route
        path="settings"
        element={
          <ProtectedRoute ifReturn={Boolean(me.username)}>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route path="/tags" element={<Tags />} />

      <Route path="/tag/:name" element={<Tag />} />

      <Route path="/profile/:username" element={<Profile />} />

      <Route
        path="post/:id"
        element={
          <ProtectedRoute ifReturn={Boolean(me.username)}>
            <Post />
          </ProtectedRoute>
        }
      />

      <Route
        path="update/:id"
        element={
          <ProtectedRoute ifReturn={Boolean(me.username)}>
            <UpdatePost />
          </ProtectedRoute>
        }
      />

      <Route path=":url" element={<PublicPost me={me} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

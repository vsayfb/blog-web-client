import { Route, Routes } from "react-router-dom";
import Main from "../screens/Main";
import { ProtectedRoute } from "../lib/components/ProtectedRoute";
import { Me } from "../lib/slices/authSlice";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { PublicPost } from "../screens/PublicPost";
import { WritePost } from "../screens/WritePost";
import { Dashboard } from "../screens/Dashboard";
import { UpdatePost } from "../screens/UpdatePost";
import { Post } from "../screens/Post";
import { NotFound } from "../screens/NotFound";

export const AppRoutes = ({ me }: { me: Me }) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="signIn" element={<SignIn />} />
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

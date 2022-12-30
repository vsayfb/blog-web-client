import { useState } from "react";
import { Helmet } from "react-helmet";
import Auth from "../auth/components/Auth";
import AuthHeader, { AuthType } from "../auth/components/AuthHeader";
import { AuthMiddle } from "../auth/components/AuthMiddle";
import { SignInDefault } from "../auth/local/login/SignInDefault";
import ViaGoogle from "../auth/google/ViaGoogle";

export default function SignInScreen() {
  const [loginDto, setLoginDto] = useState({ username: "", password: "" });

  return (
    <Auth>
      <>
        <Helmet>
          <title>Sign In</title>
        </Helmet>

        <AuthHeader type={AuthType.SingIn} />
        <ViaGoogle type="login" />

        <div className="mt-2">
          <AuthMiddle />
        </div>

        <SignInDefault loginDto={loginDto} setLoginDto={setLoginDto} />
      </>
    </Auth>
  );
}

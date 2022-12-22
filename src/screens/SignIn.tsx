import { useState } from "react";
import { Helmet } from "react-helmet";
import Auth from "../auth/components/Auth";
import AuthHeader, { AuthType } from "../auth/components/AuthHeader";
import { AuthMiddle } from "../auth/components/AuthMiddle";
import { SignInDefault } from "../auth/local/login/SignInDefault";
import { TFAStep } from "../auth/local/login/TFAStep";
import ViaGoogle from "../auth/via/ViaGoogle";

export default function SignInScreen() {
  const [loginDto, setLoginDto] = useState({ username: "", password: "" });
  const [TFAEnabled, setTFAEnabled] = useState<{
    following_link: string;
    message: string;
    error?: string;
  } | null>(null);

  return (
    <Auth>
      <>
        <Helmet>
          <title>Sign In</title>
        </Helmet>

        {TFAEnabled ? (
          <TFAStep loginDto={loginDto} tfaResponse={TFAEnabled} />
        ) : (
          <>
            <AuthHeader type={AuthType.SingIn} />
            <ViaGoogle type="login" />

            <div className="mt-2">
              <AuthMiddle />
            </div>

            <SignInDefault
              loginDto={loginDto}
              setLoginDto={setLoginDto}
              setTFAEnabled={setTFAEnabled}
            />
          </>
        )}
      </>
    </Auth>
  );
}

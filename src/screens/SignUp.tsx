import { useState } from "react";
import { Helmet } from "react-helmet";
import Auth from "../auth/components/Auth";
import AuthHeader, { AuthType } from "../auth/components/AuthHeader";
import { AuthMiddle } from "../auth/components/AuthMiddle";
import ViaGoogle from "../auth/via/ViaGoogle";
import ViaLocal from "../auth/via/ViaLocal";
import { MyButton } from "../lib/components/Button";

export default function SignUp() {
  const [viaLocal, setViaLocal] = useState(false);

  return (
    <Auth>
      <div>
        <Helmet>
          <title>Sign Up</title>
        </Helmet>

        {!viaLocal ? (
          <>
            <AuthHeader type={AuthType.SignUp} />
            <ViaGoogle />
            <AuthMiddle />

            <MyButton
              onClickEvent={() => setViaLocal(true)}
              buttonText="CONTINUE WITH EMAIL"
            />
          </>
        ) : (
          <ViaLocal />
        )}
      </div>
    </Auth>
  );
}

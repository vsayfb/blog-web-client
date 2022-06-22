import { useState } from "react";
import { Helmet } from "react-helmet";
import Auth from "../auth/components/Auth";
import AuthHeader, { AuthType } from "../auth/components/AuthHeader";
import { AuthMiddle } from "../auth/components/AuthMiddle";
import ViaGoogle from "../auth/via/ViaGoogle";
import ViaLocal from "../auth/via/ViaLocal";

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

            <button
              role="button"
              onClick={() => setViaLocal(true)}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              {"CONTINUE WITH EMAIL"}
            </button>
          </>
        ) : (
          <ViaLocal />
        )}
      </div>
    </Auth>
  );
}

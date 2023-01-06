import { useState } from "react";
import { Helmet } from "react-helmet";
import Auth from "../auth/components/Auth";
import AuthHeader, { AuthType } from "../auth/components/AuthHeader";
import { AuthMiddle } from "../auth/components/AuthMiddle";
import ViaGoogle from "../auth/google/ViaGoogle";
import ViaEmail from "../auth/via/ViaEmail";
import { MyButton } from "../lib/components/Button";
import ViaMobilPhone from "../auth/via/ViaMobilPhone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { hideSignUpInitStep } from "../lib/slices/appSlice";

export default function SignUp() {
  const { signUpInitStep } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  const [viaEmail, setViaEmail] = useState(false);

  const [viaMobilPhone, setViaMobilPhone] = useState(false);

  if (signUpInitStep) {
    return (
      <Auth>
        <div>
          <Helmet>
            <title>Sign Up</title>
          </Helmet>

          <AuthHeader type={AuthType.SignUp} />
          <ViaGoogle type="register" />
          <AuthMiddle />

          <MyButton
            onClickEvent={() => {
              dispatch(hideSignUpInitStep());
              setViaEmail(true);
            }}
            buttonText="CONTINUE WITH EMAIL"
          />

          {process.env.MOBILE_FACTOR_ENABLED && (
            <MyButton
              classProperties="mt-4"
              onClickEvent={() => {
                dispatch(hideSignUpInitStep());
                setViaMobilPhone(true);
              }}
              buttonText="CONTINUE WITH PHONE"
            />
          )}
        </div>
      </Auth>
    );
  } else {
    return (
      <Auth>
        <div>
          <Helmet>
            <title>Sign Up</title>
          </Helmet>

          {viaEmail ? <ViaEmail /> : viaMobilPhone ? <ViaMobilPhone /> : null}
        </div>
      </Auth>
    );
  }
}

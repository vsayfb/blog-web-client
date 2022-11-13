import Auth from "../auth/components/Auth";
import AuthHeader, { AuthType } from "../auth/components/AuthHeader";
import ViaGoogle from "../auth/via/ViaGoogle";
import { InputField } from "../lib/components/InputField";
import { useEffect, useState } from "react";
import { MyButton } from "../lib/components/Button";
import { useDispatch } from "react-redux";
import { AuthMiddle } from "../auth/components/AuthMiddle";
import { localLogin } from "../lib/api/auth";
import { setError } from "../lib/slices/appSlice";
import { Helmet } from "react-helmet";

export default function SignIn() {
  const dispatch = useDispatch();

  const [loginDto, setLoginDto] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  async function makeLoginRequest() {
    try {
      const { access_token } = await localLogin(
        loginDto.username,
        loginDto.password
      );

      localStorage.setItem("token", access_token);

      window.location.href = "/";
    } catch (error: any) {
      dispatch(setError("Invalid credentials."));
    }
  }

  return (
    <Auth>
      <>
        <Helmet>
          <title>Sign In</title>
        </Helmet>

        <AuthHeader type={AuthType.SingIn} />
        <ViaGoogle />

        <div className="mt-2">
          <AuthMiddle />
        </div>

        <div className="mt-4">
          <InputField
            labelText="Username or Email"
            onChangeEvent={(e) =>
              setLoginDto((prev) => ({ ...prev, username: e.target.value }))
            }
            value={loginDto.username}
            type={"text"}
          />
        </div>

        <div className="mt-4">
          <InputField
            labelText="Password"
            onChangeEvent={(e) =>
              setLoginDto((prev) => ({ ...prev, password: e.target.value }))
            }
            value={loginDto.password}
            type={"password"}
          />
        </div>

        <div className="mt-4">
          <MyButton buttonText="LOGIN" onClickEvent={makeLoginRequest} />
        </div>
      </>
    </Auth>
  );
}

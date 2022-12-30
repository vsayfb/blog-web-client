import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localLogin } from "../../../lib/api/auth";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { setLocalStorageToken } from "../../../lib/setLocalStorageToken";
import { setError, setWarn } from "../../../lib/slices/appSlice";
import { setTfaData, setTfaEnabled } from "../../slices/authSlice";

export const SignInDefault = ({
  loginDto,
  setLoginDto,
}: {
  loginDto: { username: string; password: string };
  setLoginDto: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
    }>
  >;
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function makeLoginRequest() {
    try {
      const result = await localLogin(loginDto.username, loginDto.password);

      console.log(result);

      if (result.following_link) {
        dispatch(setTfaEnabled(true));

        dispatch(
          setTfaData({
            verification_token: result.following_link.substring(1),
            via:
              result.message.indexOf("email") >= 0 ? "email" : "mobile phone",
          })
        );

        navigate("/two_factor_auth");
      } else {
        setLocalStorageToken(result.data?.access_token as string);

        window.location.href = "/";
      }
    } catch (error: any) {
      if (error.response?.data.message.indexOf("sent") >= 0) {
        setTfaEnabled(true);

        navigate("/two_factor_auth");
      } else {
        dispatch(setError("Invalid credentials."));
      }
    }
  }

  return (
    <>
      <>
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
    </>
  );
};

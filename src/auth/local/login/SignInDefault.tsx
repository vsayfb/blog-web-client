import { useDispatch } from "react-redux";
import { localLogin } from "../../../lib/api/auth";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { setLocalStorageToken } from "../../../lib/setLocalStorageToken";
import { setError, setWarn } from "../../../lib/slices/appSlice";

export const SignInDefault = ({
  loginDto,
  setLoginDto,
  setTFAEnabled,
}: {
  loginDto: { username: string; password: string };
  setLoginDto: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
    }>
  >;
  setTFAEnabled: React.Dispatch<
    React.SetStateAction<{
      message: string;
      following_link: string;
      error?: string;
    } | null>
  >;
}) => {
  const dispatch = useDispatch();

  async function makeLoginRequest() {
    try {
      const result = await localLogin(loginDto.username, loginDto.password);

      if (result.following_link) {
        setTFAEnabled({
          following_link: result.following_link,
          message: result.message,
        });
      } else {
        setLocalStorageToken(result.data?.access_token as string);

        window.location.href = "/";
      }
    } catch (error: any) {
      if (error.response?.data.message.indexOf("sent") >= 0) {
        setTFAEnabled((p) => {
          if (p) return { ...p, error: error.response.data.message };
          return p;
        });
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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppHashColors } from "../../../App";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";
import { setError } from "../../../lib/slices/appSlice";
import { SecuritySVG } from "../../../lib/svgs/SecuritySVG";
import { TwoFactorAuthDto } from "./TwoFactorAuth";
import { setTFA } from "../../slices/settingsSlice";

export const DisableTFA = ({ tfa }: { tfa: TwoFactorAuthDto["data"] }) => {
  const [loading, setLoading] = useState(false);
  const [codeInputVisibility, setCodeInputVisibility] = useState(false);

  const [passwordWrong, setPasswordWrong] = useState(false);
  const [codeWrong, setCodeWrong] = useState(false);

  const [password, setPassword] = useState("");
  const [code, setCode] = useState({
    verification_code: "",
    verification_token: "",
  });

  const [codeSentTo, setCodeSentTo] = useState<"email" | "mobile phone">(
    "email"
  );

  const dispatch = useDispatch();

  async function disable() {
    setLoading(true);

    try {
      const result: { following_link: string; message: string } =
        await sendRequest(`accounts/2fa/disable_current`, "post", true, {
          password,
        });

      setCodeSentTo(
        result.message.indexOf("email") >= 0 ? "email" : "mobile phone"
      );

      setCode((p) => ({ ...p, verification_token: result.following_link }));

      setCodeInputVisibility(true);
    } catch (error: any) {
      if (error.response.data.message.indexOf("sent") >= 0) {
        setCodeInputVisibility(true);

        setCode((p) => ({
          ...p,
          verification_token: error.response.data.following_link,
        }));
      } else {
        setPasswordWrong(true);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteTFA() {
    setLoading(true);

    try {
      await sendRequest(code.verification_token, "post", true, {
        verification_code: code.verification_code,
      });

      setCodeInputVisibility(false);
      setCode({ verification_code: "", verification_token: "" });
      setPassword("");
      setPasswordWrong(false);
      setCodeWrong(false);

      dispatch(setTFA(null));
    } catch (error: any) {
      setCodeWrong(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {codeInputVisibility ? (
        <div className="mt-4">
          <div className="mt-4 flex items-center">
            <SecuritySVG fill={AppHashColors.RED} />

            <div>
              <h4 className="ml-2">Disable Two Factor Authentication</h4>
            </div>
          </div>

          <div className="mt-2">
            <small>{`A verification code sent to your ${codeSentTo}`}.</small>
          </div>

          <div className="mt-2">
            <InputField
              value={code.verification_code}
              onChangeEvent={(e) => {
                setCode((p) => ({ ...p, verification_code: e.target.value }));
              }}
              labelAttributes={codeWrong ? "border-red-500" : ""}
              type="text"
              placeholderText="Enter code here"
            />
          </div>

          <MyButton
            buttonText="DISABLE"
            onClickEvent={() => deleteTFA()}
            classProperties={`bg-red-500 mt-5 ${
              loading ? "bg-zinc-400" : ""
            } w-44`}
            disabled={loading}
          />
        </div>
      ) : (
        <div>
          <div className="mt-4 flex items-center">
            <SecuritySVG fill={AppHashColors.EMERALD} />
            <h4 className="ml-2">Two Factor Authentication is active</h4>
          </div>

          <div className="mt-4">
            <h5>
              Your account is secure with{" "}
              <b className="text-emerald-400">
                {" "}
                your{" "}
                {`${tfa.via.indexOf("email") >= 0 ? "email" : "mobile phone"}`}
                {"."}
              </b>
            </h5>
          </div>

          <div className="mt-4">
            <InputField
              labelText="Password"
              value={password}
              onChangeEvent={(e) => {
                if (e.target.value.length < 7 || e.target.value.length > 16) {
                  setPasswordWrong(true);
                } else {
                  setPasswordWrong(false);
                }
                setPassword(e.target.value);
              }}
              inputAttributes={passwordWrong ? "border-red-500" : ""}
              type="password"
            />
          </div>

          <MyButton
            buttonText="DISABLE"
            onClickEvent={() => disable()}
            classProperties={`bg-red-500 mt-5 ${
              loading ? "bg-zinc-400" : ""
            } w-44`}
            disabled={loading}
          />
        </div>
      )}
    </div>
  );
};

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
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [codeSentTo, setCodeSentTo] = useState<"email" | "mobile phone">(
    "email"
  );

  const [followingURL, setFollowingURL] = useState("");

  const dispatch = useDispatch();

  async function disable() {
    setLoading(true);

    try {
      const result: { following_url: string; message: string } =
        await sendRequest(`accounts/2fa/disable_current`, "post", true, {
          password,
        });

      setCodeSentTo(
        result.message.indexOf("email") >= 0 ? "email" : "mobile phone"
      );

      setFollowingURL(result.following_url.substring(1));

      setCodeInputVisibility(true);
    } catch (error: any) {
      if (error.response.data.message.indexOf("sent") >= 0) {
        setCodeInputVisibility(true);
      } else {
        dispatch(setError("Password was wrong."));
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteTFA() {
    setLoading(true);

    try {
      await sendRequest(followingURL, "delete", true, {
        verification_code: code,
      });

      setCodeInputVisibility(false);

      dispatch(setTFA(null));
    } catch (error: any) {
      dispatch(setError("Verification code was wrong."));
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

          <div>
            <small>{`A verification code sent to your ${codeSentTo}`}.</small>
          </div>

          <div className="mt-6">
            <InputField
              labelText="Verification code"
              value={code}
              onChangeEvent={(e) => setCode(e.target.value)}
              type="text"
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
              onChangeEvent={(e) => setPassword(e.target.value)}
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHashColors } from "../../../App";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";
import { setError } from "../../../lib/slices/appSlice";
import { InfoFillSVG } from "../../../lib/svgs/InfoFillSVG";
import { SecuritySVG } from "../../../lib/svgs/SecuritySVG";
import { setTFA } from "../../slices/settingsSlice";
import { AccountDto, RegisteredVia } from "../account/Account";
import { GoogleAccountTfaOptions } from "./GoogleAccountTfaOptions";
import { LocalAccountTfaOptions } from "./LocalAccountTFAOptions";

export const EnableTFA = ({ account }: { account: AccountDto }) => {
  const [loading, setLoading] = useState(false);
  const [codeInputVisibility, setCodeInputVisibility] = useState(false);

  const [codeWrong, setCodeWrong] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(false);

  const [password, setPassword] = useState("");
  const [code, setCode] = useState({
    verification_token: "",
    verification_code: "",
  });

  const [enableVia, setEnableVia] = useState<"email" | "mobile_phone">("email");

  const dispatch = useDispatch();

  async function enable() {
    setLoading(true);

    try {
      const result = await sendRequest(
        `${account.via}_accounts/2fa/enable_with_${enableVia}`,
        "post",
        true,
        {
          password,
        }
      );

      setCode((p) => ({ ...p, verification_token: result.following_link }));

      setCodeInputVisibility(true);
    } catch (error: any) {
      console.log(error.response.data);

      if (error.response.data.message.indexOf("sent") >= 0) {
        setCode((p) => ({
          ...p,
          verification_token: error.response.data.following_link,
        }));

        setCodeInputVisibility(true);
      } else setPasswordWrong(true);
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    setLoading(true);

    try {
      const result = await sendRequest(code.verification_token, "post", true, {
        verification_code: code.verification_code,
      });

      setCodeInputVisibility(false);
      setCodeWrong(false);
      setPasswordWrong(false);
      setCode({ verification_code: "", verification_token: "" });

      dispatch(setTFA(result.data));
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
          <h3 className="mb-4">
            {`A verification code sent to your ${
              enableVia === "email" ? "email" : "mobile phone"
            }`}
            .
          </h3>

          <InputField
            labelText="Verification code"
            value={code.verification_code}
            onChangeEvent={(e) =>
              setCode((p) => ({ ...p, verification_code: e.target.value }))
            }
            type="text"
          />

          <MyButton
            buttonText="ENABLE"
            onClickEvent={() => create()}
            classProperties={`mt-5 ${loading ? "bg-zinc-400" : ""} w-44`}
            disabled={loading}
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <div>
              <SecuritySVG fill={AppHashColors.RED} />
            </div>

            <div>
              <h4 className="ml-2">Enable Two Factor Auth</h4>
            </div>
          </div>
          <div className="flex mt-4">
            <InfoFillSVG fill={AppHashColors.EMERALD} />

            <small className="ml-2">
              We will send you a verification code when you login to your
              account.
            </small>
          </div>
          <div className="mt-4">
            {account.via === "local" ? (
              <LocalAccountTfaOptions
                enableWithEmail={Boolean(account.email)}
                enableWithMobilePhone={Boolean(account.mobile_phone)}
                setEnableVia={setEnableVia}
              />
            ) : (
              <GoogleAccountTfaOptions
                enableWithMobilePhone={Boolean(account.mobile_phone)}
                setEnableVia={setEnableVia}
              />
            )}
          </div>
          {account.via === "google" && !account.mobile_phone ? (
            <div className="flex items-center">
              <div>
                <InfoFillSVG fill={AppHashColors.RED} />
              </div>

              <i className="ml-2">
                To enable two factor authentication add a phone number to your
                account.
              </i>
            </div>
          ) : (
            <>
              <div className="mt-6">
                <InputField
                  value={password}
                  onChangeEvent={(e) => {
                    if (
                      e.target.value.length < 7 ||
                      e.target.value.length > 16
                    ) {
                      setPasswordWrong(true);
                    } else {
                      setPasswordWrong(false);
                    }
                    setPassword(e.target.value);
                  }}
                  placeholderText="Enter your password"
                  inputAttributes={passwordWrong ? "border-red-500" : ""}
                  type="password"
                />
              </div>

              <MyButton
                buttonText="ENABLE"
                onClickEvent={() => enable()}
                classProperties={`mt-5 ${loading ? "bg-zinc-400" : ""} w-44`}
                disabled={loading}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

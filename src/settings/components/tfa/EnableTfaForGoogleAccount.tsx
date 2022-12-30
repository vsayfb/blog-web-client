import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppHashColors } from "../../../App";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";
import { setError } from "../../../lib/slices/appSlice";
import { ExclamationSVG } from "../../../lib/svgs/ExclamationSVG";
import { InfoFillSVG } from "../../../lib/svgs/InfoFillSVG";
import { SecuritySVG } from "../../../lib/svgs/SecuritySVG";
import { setTFA } from "../../slices/settingsSlice";
import { AccountDto, RegisteredVia } from "../account/Account";
import { GoogleAccountTfaOptions } from "./GoogleAccountTfaOptions";
import { LocalAccountTfaOptions } from "./LocalAccountTFAOptions";

export const EnableTfaForGoogleAccount = ({
  account,
}: {
  account: AccountDto;
}) => {
  const [loading, setLoading] = useState(false);
  const [codeInputVisibility, setCodeInputVisibility] = useState(false);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  async function enable() {
    setLoading(true);

    try {
      await sendRequest(
        `google_accounts/2fa/enable_with_mobile_phone`,
        "post",
        true,
        {
          password,
        }
      );

      setCodeInputVisibility(true);
    } catch (error: any) {
      dispatch(setError("Password was wrong."));
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    setLoading(true);

    try {
      const result = await sendRequest(
        `security/2fa/mobile_phone`,
        "post",
        true,
        {
          password,
          verification_code: code,
        }
      );

      setCodeInputVisibility(false);

      dispatch(setTFA(result.data));
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
          <h3 className="mb-4">
            {`A verification code sent to your mobile phone.`}
          </h3>

          <InputField
            labelText="Verification code"
            value={code}
            onChangeEvent={(e) => setCode(e.target.value)}
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
              <h4 className="ml-2">Enable Two Factor Authentication</h4>
            </div>
          </div>

          {account.mobile_phone ? (
            <>
              <div className="flex mt-4">
                <InfoFillSVG fill={AppHashColors.EMERALD} />

                <small className="ml-2">
                  We will send you a verification code when you login to your
                  account.
                </small>
              </div>

              <div className="mt-6">
                <InputField
                  value={password}
                  onChangeEvent={(e) => setPassword(e.target.value)}
                  placeholderText="Type your password"
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
          ) : (
            <div className="flex mt-4">
              <ExclamationSVG fill={AppHashColors.RED} w={25} h={25} />

              <small>
                To enable two factor authentication you have to add a mobile
                phone number to your account.
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

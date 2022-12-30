import { useState } from "react";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";

export const UpdatePassword = () => {
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [passwordWrong, setPasswordWrong] = useState(false);

  const [newPasswordWrong, setNewPasswordWrong] = useState(false);

  const [wrongCode, setWrongCode] = useState(false);

  const [codeSentVia, setCodeSentVia] = useState<"email" | "mobile phone">(
    "email"
  );

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [code, setCode] = useState({
    verification_token: "",
    verification_code: "",
  });

  const [verificationCodeStep, setVerificationCodeStep] = useState(false);

  async function changePassword() {
    setButtonDisabled(true);
    try {
      const result = await sendRequest(
        "/accounts/local/credentials/change_password",
        "post",
        true,
        {
          password,
        }
      );

      setVerificationCodeStep(true);
      setCode((p) => ({
        ...p,
        verification_token: result.following_link,
      }));

      setCodeSentVia(
        result.message.indexOf("email") >= 0 ? "email" : "mobile phone"
      );
    } catch (error: any) {
      if (error.response.data.message.indexOf("sent") >= 0) {
        setVerificationCodeStep(true);
        setCode((p) => ({
          ...p,
          verification_token: error.response.data.following_link,
        }));
      }
      setPasswordWrong(true);
    } finally {
      setButtonDisabled(false);
    }
  }

  async function updatePassword() {
    setButtonDisabled(true);
    try {
      await sendRequest(code.verification_token, "patch", true, {
        new_password: newPassword,
        verification_code: code.verification_code,
      });

      setVerificationCodeStep(false);
      setPassword("");
      setNewPassword("");
      setWrongCode(false);
      setPasswordWrong(false);
      setNewPasswordWrong(false);
    } catch (error) {
      setWrongCode(true);
      setNewPasswordWrong(true);
    } finally {
      setButtonDisabled(false);
    }
  }

  return (
    <>
      {verificationCodeStep ? (
        <>
          <div className="mt-4">
            <InputField
              value={code.verification_code}
              inputAttributes={wrongCode ? "border-b border-red-500" : ""}
              onChangeEvent={(e) =>
                setCode((p) => ({ ...p, verification_code: e.target.value }))
              }
              placeholderText="Enter verification code"
            />
          </div>

          <div className="mt-4">
            <MyButton
              buttonText={"UPDATE PASSWORD"}
              classProperties={"w-48 "}
              onClickEvent={() => updatePassword()}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <InputField
              placeholderText="Current Password"
              onChangeEvent={(e) => {
                if (password.length < 7 || password.length > 16) {
                  setPasswordWrong(true);
                  setButtonDisabled(true);
                } else {
                  setPasswordWrong(false);
                  setButtonDisabled(false);
                }

                setPassword(e.target.value);
              }}
              labelAttributes={passwordWrong ? "text-red-500" : ""}
              labelText={
                passwordWrong ? "Wrong password" : "Enter your password"
              }
              inputAttributes={passwordWrong ? "border-b border-red-500" : ""}
              value={password}
              type="password"
            />
          </div>

          <div className="mt-4">
            <InputField
              placeholderText="New Password"
              onChangeEvent={(e) => {
                if (newPassword.length < 7 || newPassword.length > 16) {
                  setNewPasswordWrong(true);
                  setButtonDisabled(true);
                } else {
                  setNewPasswordWrong(false);
                  setButtonDisabled(false);
                }

                setNewPassword(e.target.value);
              }}
              labelAttributes={newPasswordWrong ? "text-red-500" : ""}
              labelText={
                newPasswordWrong ? "Wrong password" : "Enter new password"
              }
              inputAttributes={
                newPasswordWrong ? "border-b border-red-500" : ""
              }
              value={newPassword}
              type="password"
            />
          </div>

          <div className="mt-4">
            <MyButton
              buttonText="UPDATE PASSWORD"
              classProperties="w-44"
              onClickEvent={changePassword}
              disabled={buttonDisabled}
              showSpinnerWhenDisabled={false}
            />
          </div>
        </>
      )}
    </>
  );
};

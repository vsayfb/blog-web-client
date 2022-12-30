import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";

export const UpdateGoogleAccountPassword = () => {
  const [googleToken, setGoogleToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordWrong, setNewPasswordWrong] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function updatePassword() {
    try {
      await sendRequest("accounts/google/update_password", "patch", true, {
        new_password: newPassword,
        google_access_token: googleToken,
      });

      setGoogleToken("");
      setButtonDisabled(false);
      setNewPasswordWrong(false);
    } catch (error) {
      setNewPasswordWrong(true);
    }
  }

  const getToken = useGoogleLogin({
    onSuccess: ({ access_token }) => setGoogleToken(access_token),
  });

  if (!googleToken) {
    return (
      <div className="mt-4">
        <MyButton
          buttonText="UPDATE PASSWORD"
          classProperties="w-44"
          onClickEvent={() => {
            setButtonDisabled(true);
            getToken();
          }}
          disabled={buttonDisabled}
        />
      </div>
    );
  }

  return googleToken ? (
    <>
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
          labelText={newPasswordWrong ? "Wrong password" : "Enter new password"}
          inputAttributes={newPasswordWrong ? "border-b border-red-500" : ""}
          value={newPassword}
          type="password"
        />
      </div>

      <div className="mt-4">
        <MyButton
          buttonText="UPDATE PASSWORD"
          classProperties="w-44"
          onClickEvent={updatePassword}
          disabled={buttonDisabled}
          showSpinnerWhenDisabled={false}
          
        />
      </div>
    </>
  ) : (
    <div className="mt-4">
      <MyButton
        buttonText="UPDATE PASSWORD"
        classProperties="w-44"
        onClickEvent={() => {
          setButtonDisabled(true);
          getToken();
        }}
        disabled={buttonDisabled}
      />
    </div>
  );
};

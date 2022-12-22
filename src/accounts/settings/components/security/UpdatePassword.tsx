import { useState } from "react";
import { MyButton } from "../../../../lib/components/Button";
import { InputField } from "../../../../lib/components/InputField";
import { sendRequest } from "../../../../lib/sendRequest";

export const UpdatePassword = () => {
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [code, setCode] = useState("");

  const [secondStep, setSecondStep] = useState(false);

  async function beginUpdatePassword() {
    setButtonDisabled(true);
    try {
      await sendRequest("accounts/begin_update_password", "post", true, {
        password,
      });

      setSecondStep(true);
    } catch (error) {
    } finally {
    }
  }

  async function updatePassword() {
    setButtonDisabled(true);
    try {
      await sendRequest("accounts/update_password/", "patch", true, {
        password,
        new_password: newPassword,
        verification_code: code,
      });
    } catch (error) {
    } finally {
      setButtonDisabled(false);
    }
  }

  return (
    <>
      {secondStep ? (
        <>
          <div className="mt-4">
            <InputField
              labelText="A code sent"
              onChangeEvent={(e) => setCode(e.target.value)}
              value={code}
            />
          </div>

          <div className="mt-4">
            <MyButton
              classProperties="w-44"
              buttonText="UPDATE PASSWORD"
              onClickEvent={updatePassword}
              disabled={buttonDisabled}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <InputField
              labelText="Current Password"
              onChangeEvent={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mt-4">
            <InputField
              labelText="New Password"
              onChangeEvent={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

          <div className="mt-4">
            <MyButton
              buttonText="UPDATE PASSWORD"
              classProperties="w-44"
              onClickEvent={beginUpdatePassword}
              disabled={buttonDisabled}
            />
          </div>
        </>
      )}
    </>
  );
};

import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../lib/components/Button";
import { InputField } from "../../lib/components/InputField";
import { sendRequest } from "../../lib/sendRequest";
import { NotFound } from "../../screens/NotFound";
import { RootState } from "../../store";
import Auth from "../components/Auth";

export function SetPassword() {
  const { googleAccessToken } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const [password, setPassword] = useState("");

  function navigateForUpdateImage() {
    navigate("/uploadProfileImage");
  }

  async function updatePassword() {
    try {
      await sendRequest("accounts/google/update_password", "post", true, {
        google_access_token: googleAccessToken,
        new_password: password,
      });

      navigateForUpdateImage();
    } catch (error: any) {
      setError(error.response.data.message[0]);
    }
  }

  if (!googleAccessToken)
    return (
      <div className="mt-14 mb-14">
        <NotFound message="Page not found." />
      </div>
    );

  return (
    <Auth>
      <div>
        <Helmet>
          <title>Set your password</title>
        </Helmet>

        <h2 className="text-zinc-900">Set your password</h2>

        <div className="mt-4">
          <InputField
            labelText={error || "Type password"}
            onChangeEvent={(e) => {
              if (password.length > 7 && password.length < 17) {
                setError("");
              }
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
          />
        </div>

        <div className="mt-4">
          <MyButton
            buttonText="SET PASSWORD"
            onClickEvent={() => updatePassword()}
          />
        </div>

        <div className="mt-4">
          <MyButton
            buttonText="SKIP FOR NOW"
            onClickEvent={navigateForUpdateImage}
            classProperties="bg-gray-500"
          />
        </div>
      </div>
    </Auth>
  );
}

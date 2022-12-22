import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppHashColors } from "../../../../App";
import { MyButton } from "../../../../lib/components/Button";
import { InputField } from "../../../../lib/components/InputField";
import { sendRequest } from "../../../../lib/sendRequest";
import { setError } from "../../../../lib/slices/appSlice";
import { SecuritySVG } from "../../../../lib/svgs/SecuritySVG";

export const EnableTFA = ({
  setTFA,
}: {
  setTFA: React.SetStateAction<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const [codeInputVisibility, setCodeInputVisibility] = useState(false);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  async function enable(via: "email" | "mobile_phone") {
    setLoading(true);

    try {
      await sendRequest(`security/2fa/enable_with_${via}`, "post", true, {
        password,
      });

      setCodeInputVisibility(true);
    } catch (error: any) {
      dispatch(setError("Password was wrong."));
    } finally {
      setLoading(false);
    }
  }

  async function create(via: "email" | "mobile_phone") {
    setLoading(true);

    try {
      const result = await sendRequest(`security/2fa/${via}`, "post", true, {
        password,
        verification_code: code,
      });

      setCodeInputVisibility(false);
      setTFA(result.data);
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
            {`A verification code sent to your ${"phone"}`}
          </h3>

          <InputField
            labelText="Verification code"
            value={code}
            onChangeEvent={(e) => setCode(e.target.value)}
            type="text"
          />

          <MyButton
            buttonText="ENABLE"
            onClickEvent={() => create("email")}
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

          <div className="mt-4">
            <InputField
              labelText="Password"
              value={password}
              onChangeEvent={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <MyButton
            buttonText="ENABLE"
            onClickEvent={() => enable("email")}
            classProperties={`mt-5 ${loading ? "bg-zinc-400" : ""} w-44`}
            disabled={loading}
          />
        </div>
      )}
    </div>
  );
};

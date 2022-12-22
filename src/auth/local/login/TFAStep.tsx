import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppHashColors } from "../../../App";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";
import { setLocalStorageToken } from "../../../lib/setLocalStorageToken";
import { setError, setWarn } from "../../../lib/slices/appSlice";
import { SecuritySVG } from "../../../lib/svgs/SecuritySVG";

export const TFAStep = ({
  loginDto,
  tfaResponse,
}: {
  loginDto: { username: string; password: string };
  tfaResponse: {
    message: string;
    following_link: string;
    error?: string;
  };
}) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [verified, setVerified] = useState<boolean | string>(false);

  useEffect(() => {
    if (tfaResponse.error) {
      dispatch(setWarn(tfaResponse.error));
    }
  }, []);

  async function verifyTFA() {
    try {
      const result: {
        data: { access_token: string; message: string };
      } = await sendRequest("auth/verify_tfa_login", "post", false, {
        ...loginDto,
        verification_code: code,
      });

      setLocalStorageToken(result.data.access_token);

      window.location.href = "/";
    } catch (error) {
      setVerified("rejected");
      dispatch(setError("Invalid code."));
    }
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <SecuritySVG fill={AppHashColors.EMERALD} w={120} h={60} />
      </div>

      <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-2 mt-2">
        {tfaResponse.message}
      </p>

      <InputField
        value={code}
        labelText="It will be expired after two minutes."
        onChangeEvent={(e) => setCode(e.target.value)}
        inputAttributes={`${verified === "rejected" ? "border-red-500" : ""} ${
          verified === true ? "border-emerald-500" : ""
        }`}
        type="text"
      />

      <div className="mt-4">
        <MyButton buttonText="LOGIN" onClickEvent={verifyTFA} />
      </div>
    </div>
  );
};

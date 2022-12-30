import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppHashColors } from "../../../App";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";
import { setLocalStorageToken } from "../../../lib/setLocalStorageToken";
import { SecuritySVG } from "../../../lib/svgs/SecuritySVG";
import { NotFound } from "../../../screens/NotFound";
import { RootState } from "../../../store";
import { GoogleResponseData } from "../../google/ViaGoogle";
import { setMe } from "../../slices/authSlice";

export const TFAScreen = () => {
  const { tfaEnabled, tfaData } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [code, setCode] = useState("");

  const [verified, setVerified] = useState<boolean | string>(false);

  const navigate = useNavigate();

  async function verifyTFA() {
    try {
      const result: GoogleResponseData = await sendRequest(
        tfaData.verification_token,
        "post",
        false,
        {
          verification_code: code,
        }
      );

      setLocalStorageToken(result.data.access_token);

      const { display_name, image, role, username, id } = result.data.account;

      dispatch(
        setMe({ sub: id, dispatch, image, role, display_name, username })
      );

      navigate("/");
    } catch (error) {
      setVerified("rejected");
    }
  }

  if (!tfaEnabled) {
    return <NotFound message="Page not found." />;
  }

  return (
    <div className="flex justify-center items-center pt-32 ">
      <div>
        <div className="flex justify-center mb-8">
          <SecuritySVG fill={AppHashColors.EMERALD} w={120} h={60} />
        </div>

        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-2 mt-2">
          A verification code sent to your {tfaData.via}.
        </p>

        <InputField
          value={code}
          labelText="It will be expired after two minutes."
          onChangeEvent={(e) => setCode(e.target.value)}
          inputAttributes={`${
            verified === "rejected" ? "border-red-500" : ""
          } ${verified === true ? "border-emerald-500" : ""}`}
          type="text"
        />

        <div className="mt-4">
          <MyButton buttonText="LOGIN" onClickEvent={verifyTFA} />
        </div>
      </div>
    </div>
  );
};

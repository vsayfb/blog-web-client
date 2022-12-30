import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../lib/api/auth";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { setLocalStorageToken } from "../../../lib/setLocalStorageToken";
import { setError } from "../../../lib/slices/appSlice";
import { RootState } from "../../../store";
import {
  setLocalRegisterVerificationCode,
  setMe,
} from "../../slices/authSlice";

export const VerificationCodeStep = ({ via }: { via: "phone" | "email" }) => {
  const [verified, setVerified] = useState<boolean | string>(false);

  const { localRegisterVerificationCode } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (verified === true) navigate("/uploadProfileImage");
  }, [verified]);

  async function registerAccount() {
    if (
      localRegisterVerificationCode.token &&
      localRegisterVerificationCode.code
    ) {
      try {
        const { data } = await register(
          localRegisterVerificationCode.token,
          localRegisterVerificationCode.code
        );

        setVerified(true);

        setLocalStorageToken(data.access_token);

        const { display_name, id, image, role, username } = data.account;

        dispatch(setMe({ sub: id, image, display_name, role, username }));
      } catch (error: any) {
        setVerified("rejected");
        // dispatch(setError(error.response.data.message));
        dispatch(setError("Invalid code."));
      } finally {
      }
    } else {
      dispatch(setError("Please write the code."));
    }
  }

  return (
    <div>
      <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-2 mt-2">
        {`A code sent to your ${via}.`}
      </p>

      <InputField
        value={localRegisterVerificationCode.code || ""}
        labelText="It will be expired after two minutes."
        onChangeEvent={(e) =>
          dispatch(
            setLocalRegisterVerificationCode({
              code: e.target.value.toString(),
            })
          )
        }
        inputAttributes={`${verified === "rejected" ? "border-red-500" : ""} ${
          verified === true ? "border-emerald-500" : ""
        }`}
        type="text"
      />

      <div className="mt-4">
        <MyButton buttonText="Verify" onClickEvent={registerAccount} />
      </div>
    </div>
  );
};

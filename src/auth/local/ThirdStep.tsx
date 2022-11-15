import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InputField } from "../../lib/components/InputField";
import { setError, setLoading } from "../../lib/slices/appSlice";
import { setLocalStorageToken } from "../../lib/setLocalStorageToken";
import { setMe } from "../slices/authSlice";
import { CreateAccoundDto } from "../via/ViaLocal";
import { register } from "../../lib/api/auth";
import { MyButton } from "../../lib/components/Button";

export const ThirdStep = ({
  setStep,
  setAccountDto,
  accountDto,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setAccountDto: Dispatch<SetStateAction<CreateAccoundDto>>;
  accountDto: CreateAccoundDto;
}) => {
  const [verified, setVerified] = useState<boolean | string>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (verified === true) setStep(4);
  }, [verified]);

  async function registerAccount() {
    if (accountDto.verification_code?.length) {
      try {
        const { data } = await register(accountDto);

        setVerified(true);

        dispatch(setMe(data.account));

        setLocalStorageToken(data.access_token);
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
        We sent a code to your email.
      </p>

      <InputField
        value={accountDto.verification_code || ""}
        labelText="It will be expired after two minutes."
        onChangeEvent={(e) =>
          setAccountDto((prev) => ({
            ...prev,
            verification_code: e.target.value.toString(),
          }))
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

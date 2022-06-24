import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InputField } from "../../lib/components/InputField";
import { setError, setLoading } from "../../lib/slices/appSlice";
import { setLocalStorageToken } from "../../lib/setLocalStorageToken";
import { setMe } from "../../lib/slices/authSlice";
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
    if (verified) setStep(4);
  }, [verified]);

  async function registerAccount() {
    dispatch(setLoading());

    try {
      const { access_token, account } = await register(accountDto);

      setVerified(true);

      dispatch(setMe(account));

      setLocalStorageToken(access_token);
    } catch (error: any) {
      setVerified("rejected");
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading());
    }
  }

  return (
    <div>
      <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-2 mt-2">
        We sent a code to you.
      </p>

      <InputField
        value={accountDto.verification_code || ""}
        labelText="Enter Code to below"
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

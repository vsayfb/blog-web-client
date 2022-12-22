import axios from "axios";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { BackSVG } from "../../../lib/svgs/BackSVG";
import { setError, setWarn } from "../../../lib/slices/appSlice";
import { CreateAccoundDto } from "../../via/ViaEmail";
import { beginAccountVerification } from "../../../lib/api/account";

export const SecondStep = ({
  via,
  emailOrPhone,
  displayName,
  username,
  password,
  setStep,
  setAccountDto,
}: {
  via: "email" | "phone";
  emailOrPhone: string;
  displayName: string;
  username: string;
  password: string;
  setStep: Dispatch<SetStateAction<number>>;
  setAccountDto: Dispatch<SetStateAction<CreateAccoundDto>>;
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [displayNameError, setDisplayNameError] = useState(false);

  const [displayNameSuccess, setDisplayNameSuccess] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (displayName.length) {
      if (displayName.length < 2 || displayName.length > 16) {
        setDisplayNameError(true);
        setDisplayNameSuccess(false);
      } else {
        setDisplayNameError(false);
        setDisplayNameSuccess(true);
      }
    }
  }, [displayName]);

  useEffect(() => {
    if (password.length) {
      if (password.length < 7) {
        setPasswordError(true);
        setPasswordSuccess(false);
      } else {
        setPasswordError(false);
        setPasswordSuccess(true);
      }
    }
  }, [password]);

  async function nextStep() {
    const valuesGiven = displayName.length && password.length;

    const valuesAccepted = !displayNameError && !passwordError;

    if (valuesGiven && valuesAccepted) {
      setLoading(true);

      try {
        await beginAccountVerification(emailOrPhone, username, via);

        setStep(3);
      } catch (error: any) {
        if (error.response.data.message.indexOf("sent") >= 0) {
          setStep(3);
        } else {
          dispatch(setWarn(error.response.data.message));
        }
      } finally {
        setLoading(false);
      }

      dispatch(setError(""));
    } else {
      dispatch(setError("Please fill the form."));
    }
  }

  return (
    <>
      <div
        className="cursor-pointer"
        style={{ width: "24px" }}
        onClick={() => setStep(1)}
      >
        <BackSVG />
      </div>

      <p className="mt-4 mb-4 focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
        Type your name and password
      </p>

      <div>
        <InputField
          labelText={`${
            displayNameError
              ? "Display name length must be between 2-16."
              : "Display name"
          }`}
          labelAttributes={`${displayNameError ? "text-red-500" : ""}`}
          inputAttributes={`${
            displayNameError
              ? "border-b border-red-500"
              : displayNameSuccess
              ? "border-b border-emerald-500"
              : ""
          }`}
          type={"text"}
          onChangeEvent={(e) => {
            setAccountDto((prev) => ({
              ...prev,
              display_name: e.target.value.toString(),
            }));
          }}
          value={displayName}
        />
      </div>

      <div>
        <InputField
          labelText={`${
            passwordError
              ? "Password length must be greater than 6."
              : "Password"
          }`}
          labelAttributes={`${passwordError ? "text-red-500" : ""}`}
          inputAttributes={`${
            passwordError
              ? "border-b border-red-500"
              : passwordSuccess
              ? "border-b border-emerald-500"
              : ""
          }`}
          type={"password"}
          onChangeEvent={(e) =>
            setAccountDto((prev) => ({
              ...prev,
              password: e.target.value.toString(),
            }))
          }
          value={password}
        />
      </div>

      <div className="mt-4">
        <MyButton
          buttonText="CONTINUE"
          onClickEvent={() => nextStep()}
          disabled={loading}
        />
      </div>
    </>
  );
};

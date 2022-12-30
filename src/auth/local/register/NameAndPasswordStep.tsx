import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { BackSVG } from "../../../lib/svgs/BackSVG";
import { setError, setWarn } from "../../../lib/slices/appSlice";
import { beginRegister } from "../../../lib/api/account";
import { RootState } from "../../../store";
import {
  backLocalRegisterStep,
  nextLocalRegisterStep,
  setLocalRegisterData,
  setLocalRegisterVerificationCode,
} from "../../slices/authSlice";

export const NameAndPasswordStep = ({ via }: { via: "email" | "phone" }) => {
  const dispatch = useDispatch();

  const { localRegisterData } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);

  const [displayNameError, setDisplayNameError] = useState(false);

  const [displayNameSuccess, setDisplayNameSuccess] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (localRegisterData.displayName.length) {
      if (
        localRegisterData.displayName.length < 2 ||
        localRegisterData.displayName.length > 16
      ) {
        setDisplayNameError(true);
        setDisplayNameSuccess(false);
      } else {
        setDisplayNameError(false);
        setDisplayNameSuccess(true);
      }
    }
  }, [localRegisterData.displayName]);

  useEffect(() => {
    if (localRegisterData.password.length) {
      if (localRegisterData.password.length < 7) {
        setPasswordError(true);
        setPasswordSuccess(false);
      } else {
        setPasswordError(false);
        setPasswordSuccess(true);
      }
    }
  }, [localRegisterData.password]);

  async function nextStep() {
    const valuesGiven =
      localRegisterData.displayName.length && localRegisterData.password.length;

    const valuesAccepted = !displayNameError && !passwordError;

    if (valuesGiven && valuesAccepted) {
      setLoading(true);

      try {
        const result = await beginRegister(localRegisterData, via);

        dispatch(
          setLocalRegisterVerificationCode({
            token: result.following_url,
            code: "",
          })
        );

        dispatch(nextLocalRegisterStep());
      } catch (error: any) {
        if (
          error.response.data.message.indexOf("sent") >= 0 ||
          error.response.data.message.indexOf("taken") >= 0
        ) {
          dispatch(nextLocalRegisterStep());
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
        onClick={() => dispatch(backLocalRegisterStep())}
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
            dispatch(
              setLocalRegisterData({
                displayName: e.target.value,
              })
            );
          }}
          value={localRegisterData.displayName}
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
            dispatch(
              setLocalRegisterData({
                password: e.target.value.toString(),
              })
            )
          }
          value={localRegisterData.password}
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

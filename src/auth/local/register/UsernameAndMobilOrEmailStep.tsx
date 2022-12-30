import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { BackSVG } from "../../../lib/svgs/BackSVG";
import {
  hideFastSignIn,
  hideFastSignUp,
  setError,
  showSignUpInitStep,
} from "../../../lib/slices/appSlice";
import { isAvailableField } from "../../../lib/api/account";
import {
  nextLocalRegisterStep,
  setLocalRegisterData,
} from "../../slices/authSlice";
import { RootState } from "../../../store";

export const UsernameAndMobilOrEmailStep = ({ via }: { via: "phone" | "email" }) => {
  const [areaProps, setAreaProps] = useState({
    username: {
      border: "",
      labelText: "Username",
      labelColor: "",
      error: false,
    },
    email: {
      border: "",
      labelText: "Email",
      labelColor: "",
      error: false,
    },
  });

  const { localRegisterData } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function checkTakenFields(field: "username" | "email", value: string) {
    try {
      const available = await isAvailableField(field, value);

      dispatch(setLocalRegisterData({ [field]: value }));

      const props = {
        border: available
          ? "border-b border-emerald-500"
          : "border-b border-red-500",
        labelText: available
          ? field.substring(0, 1).toUpperCase() +
            field.substring(1, field.length)
          : `The ${field} has been taken.`,
        labelColor: available ? "" : "text-red-500",
        error: !available,
      };

      setAreaProps((prev) => ({
        ...prev,
        [field]: {
          ...prev,
          ...props,
        },
      }));
    } catch (error: any) {
      setAreaProps((prev) => ({
        ...prev,
        [field]: {
          border: "border-b border-red-500",
          labelText: error.response.data.message,
          labelColor: "text-red-500",
          error: true,
        },
      }));
    }
  }

  useEffect(() => {
    if (via === "email") {
      const timeoutID = setTimeout(() => {
        if (localRegisterData.email?.length)
          checkTakenFields("email", localRegisterData.email);
      }, 600);

      return () => clearTimeout(timeoutID);
    }
  }, [
    via === "phone" ? localRegisterData.mobile_phone : localRegisterData.email,
  ]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (localRegisterData.username.length)
        checkTakenFields("username", localRegisterData.username);
    }, 600);

    return () => clearTimeout(timeoutID);
  }, [localRegisterData.username]);

  function nextStep() {
    const emailOrPhone =
      via === "email"
        ? localRegisterData.email
        : localRegisterData.mobile_phone;

    if (!localRegisterData.username.length || !emailOrPhone?.length) {
      dispatch(setError("Please fill the form."));
    } else if (areaProps.email.error || areaProps.username.error) {
      const error = areaProps.email.error ? " email" : " username";
      dispatch(setError("Please fill the" + error + " field."));
    } else {
      dispatch(nextLocalRegisterStep());
    }
  }

  return (
    <>
      <div
        className="cursor-pointer"
        style={{ width: "24px" }}
        onClick={() => {
          dispatch(hideFastSignIn());
          dispatch(hideFastSignUp());
          dispatch(showSignUpInitStep());
        }}
      >
        <BackSVG />
      </div>
      <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-4 mt-4">
        Create your account
      </p>

      <div>
        <InputField
          type={via === "email" ? "email" : "tel"}
          labelText={
            via === "email" ? areaProps.email.labelText : "Mobile phone"
          }
          value={
            via === "email"
              ? localRegisterData.email || ""
              : localRegisterData.mobile_phone || ""
          }
          onChangeEvent={(e) => {
            const value: any = {};

            if (via === "email") value.email = e.target.value;
            else value.mobile_phone = e.target.value;

            dispatch(setLocalRegisterData(value));
          }}
          labelAttributes={areaProps.email.labelColor}
          inputAttributes={areaProps.email.border}
        />
      </div>

      <div>
        <InputField
          type="text"
          labelText={areaProps.username.labelText}
          value={localRegisterData.username}
          onChangeEvent={(e) =>
            dispatch(setLocalRegisterData({ username: e.target.value }))
          }
          labelAttributes={areaProps.username.labelColor}
          inputAttributes={areaProps.username.border}
        />
      </div>

      <div className="mt-4">
        <MyButton buttonText="CONTINUE" onClickEvent={() => nextStep()} />
      </div>
    </>
  );
};

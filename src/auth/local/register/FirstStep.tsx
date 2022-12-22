import axios from "axios";
import {
  Dispatch,
  DispatchWithoutAction,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
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
import { CreateAccoundDto } from "../../via/ViaEmail";
import { isAvailableField } from "../../../lib/api/account";

export const FirstStep = ({
  via,
  emailOrPhone,
  username,
  setStep,
  setAccountDto,
}: {
  via: "phone" | "email";
  emailOrPhone: string;
  username: string;
  setStep: Dispatch<SetStateAction<number>>;
  setAccountDto: Dispatch<SetStateAction<CreateAccoundDto>>;
}) => {
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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function checkTakenFields(field: "username" | "email", value: string) {
    try {
      const available = await isAvailableField(field, value);

      setAccountDto((prev) => ({
        ...prev,
        [field]: value,
      }));

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
        if (emailOrPhone.length) checkTakenFields("email", emailOrPhone);
      }, 600);

      return () => clearTimeout(timeoutID);
    }
  }, [emailOrPhone]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (username.length) checkTakenFields("username", username);
    }, 600);

    return () => clearTimeout(timeoutID);
  }, [username]);

  function nextStep() {
    if (!username.length || !emailOrPhone.length) {
      dispatch(setError("Please fill the form."));
    } else if (areaProps.email.error || areaProps.username.error) {
      const error = areaProps.email.error ? " email" : " username";
      dispatch(setError("Please fill the" + error + " field."));
    } else {
      setStep(2);
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
          value={emailOrPhone}
          onChangeEvent={(e) =>
            setAccountDto((prev) => {
              if (via === "email") return { ...prev, email: e.target.value };

              return { ...prev, phone: e.target.value };
            })
          }
          labelAttributes={areaProps.email.labelColor}
          inputAttributes={areaProps.email.border}
        />
      </div>

      <div>
        <InputField
          type="text"
          labelText={areaProps.username.labelText}
          value={username}
          onChangeEvent={(e) =>
            setAccountDto((prev) => ({ ...prev, username: e.target.value }))
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

import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../lib/components/Button";
import { InputField } from "../../lib/components/InputField";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { setError } from "../../lib/slices/appSlice";
import { CreateAccoundDto } from "../via/ViaLocal";
import { isAvailableField } from "../../lib/api/account";

export const FirstStep = ({
  setStep,
  email,
  username,
  setAccountDto,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
  username: string;
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
    const timeoutID = setTimeout(() => {
      if (email.length) checkTakenFields("email", email);
    }, 600);

    return () => clearTimeout(timeoutID);
  }, [email]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (username.length) checkTakenFields("username", username);
    }, 600);

    return () => clearTimeout(timeoutID);
  }, [username]);

  function nextStep() {
    if (!username.length || !email.length) {
      dispatch(setError("Fill the form."));
    } else if (areaProps.email.error || areaProps.username.error) {
      const error = areaProps.email.error ? "Email" : "Username";
      dispatch(setError("Fill the" + error + "field."));
    } else {
      setStep(2);
    }
  }

  return (
    <>
      <div
        className="cursor-pointer"
        style={{ width: "24px" }}
        onClick={() => navigate(0)}
      >
        <BackSVG />
      </div>
      <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-4 mt-4">
        Create your account
      </p>

      <div>
        <InputField
          type="email"
          labelText={areaProps.email.labelText}
          value={email}
          onChangeEvent={(e) =>
            setAccountDto((prev) => ({ ...prev, email: e.target.value }))
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

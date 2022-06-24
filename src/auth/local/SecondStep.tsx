import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { MyButton } from "../../lib/components/Button";
import { InputField } from "../../lib/components/InputField";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { setError } from "../../lib/slices/appSlice";
import { CreateAccoundDto } from "../via/ViaLocal";
import { beginAccountVerification } from "../../lib/api/account";

export const SecondStep = ({
  setStep,
  email,
  displayName,
  username,
  password,
  setAccountDto,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
  displayName: string;
  username: string;
  password: string;
  setAccountDto: Dispatch<SetStateAction<CreateAccoundDto>>;
}) => {
  async function beginEmailVerification() {
    return await beginAccountVerification(email, username);
  }

  const dispatch = useDispatch();

  async function nextStep() {
    if (displayName.length < 3) {
      dispatch(setError("Please fill the Display Name field."));
    } else if (password.length < 7) {
      dispatch(setError("Please fill the password field."));
    } else {
      try {
        await beginEmailVerification();

        setStep(3);
      } catch (error: any) {
        dispatch(setError(error.response.data.message));
      }
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
          labelText="Display name"
          type={"text"}
          onChangeEvent={(e) =>
            setAccountDto((prev) => ({
              ...prev,
              display_name: e.target.value.toString(),
            }))
          }
          value={displayName}
        />
      </div>

      <div>
        <InputField
          labelText="Password"
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
        <MyButton buttonText="CONTINUE" onClickEvent={() => nextStep()} />
      </div>
    </>
  );
};

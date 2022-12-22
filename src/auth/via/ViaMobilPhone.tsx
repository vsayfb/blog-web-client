import { useEffect, useReducer, useState } from "react";
import { UploadProfileImage } from "../../lib/components/UploadProfileImage";
import { useNavigate } from "react-router-dom";
import { NextSVG } from "../../lib/svgs/NextSVG";
import { CreateAccoundDto } from "./ViaEmail";
import { FirstStep } from "../local/register/FirstStep";
import { SecondStep } from "../local/register/SecondStep";
import { ThirdStep } from "../local/register/ThirdStep";

export default function ViaMobilPhone() {
  const [step, setStep] = useState(1);

  const [accountDto, setAccountDto] = useState<CreateAccoundDto>({
    phone: null,
    email: null,
    username: null,
    display_name: null,
    password: null,
    verification_code: null,
    image: null,
  });

  const navigate = useNavigate();

  return (
    <>
      {step === 1 ? (
        <FirstStep
          via="phone"
          setStep={setStep}
          setAccountDto={setAccountDto}
          emailOrPhone={accountDto.phone || ""}
          username={accountDto.username || ""}
        />
      ) : step === 2 ? (
        <SecondStep
          via={"phone"}
          setStep={setStep}
          emailOrPhone={accountDto.phone || ""}
          displayName={accountDto.display_name || ""}
          username={accountDto.username || ""}
          password={accountDto.password || ""}
          setAccountDto={setAccountDto}
        />
      ) : step === 3 ? (
        <ThirdStep
          via={"phone"}
          setAccountDto={setAccountDto}
          accountDto={accountDto}
          setStep={setStep}
        />
      ) : step === 4 ? (
        <>
          <UploadProfileImage />
          <div className="mt-6 flex justify-center ">
            <span className="cursor-pointer" onClick={() => navigate("/")}>
              <NextSVG w="40" h="40" />
            </span>
          </div>
        </>
      ) : null}
    </>
  );
}

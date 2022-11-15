import { useState } from "react";
import { SecondStep } from "../local/SecondStep";
import { FirstStep } from "../local/FirstStep";
import { ThirdStep } from "../local/ThirdStep";
import { UploadProfileImage } from "../../lib/components/UploadProfileImage";
import { useNavigate } from "react-router-dom";
import { NextSVG } from "../../lib/svgs/NextSVG";

export type CreateAccoundDto = {
  email: string | null;
  username: string | null;
  display_name: string | null;
  password: string | null;
  verification_code: string | null;
  image: string | null;
};

export default function ViaLocal() {
  const [step, setStep] = useState(1);

  const [accountDto, setAccountDto] = useState<CreateAccoundDto>({
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
          setStep={setStep}
          setAccountDto={setAccountDto}
          email={accountDto.email || ""}
          username={accountDto.username || ""}
        />
      ) : step === 2 ? (
        <SecondStep
          setStep={setStep}
          email={accountDto.email || ""}
          displayName={accountDto.display_name || ""}
          username={accountDto.username || ""}
          password={accountDto.password || ""}
          setAccountDto={setAccountDto}
        />
      ) : step === 3 ? (
        <ThirdStep
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

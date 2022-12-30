import { UsernameAndMobilOrEmailStep } from "../local/register/UsernameAndMobilOrEmailStep";
import { NameAndPasswordStep } from "../local/register/NameAndPasswordStep";
import { VerificationCodeStep } from "../local/register/VerificationCodeStep";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function ViaMobilPhone() {
  const { localRegisterStep } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {localRegisterStep === 1 ? (
        <UsernameAndMobilOrEmailStep via="phone" />
      ) : localRegisterStep === 2 ? (
        <NameAndPasswordStep via={"phone"} />
      ) : localRegisterStep === 3 ? (
        <VerificationCodeStep via={"phone"} />
      ) : null}
    </>
  );
}

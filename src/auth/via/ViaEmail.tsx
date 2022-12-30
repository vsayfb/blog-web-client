import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UsernameAndMobilOrEmailStep } from "../local/register/UsernameAndMobilOrEmailStep";
import { NameAndPasswordStep } from "../local/register/NameAndPasswordStep";
import { VerificationCodeStep } from "../local/register/VerificationCodeStep";

export default function ViaEmail() {
  const { localRegisterStep } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {localRegisterStep === 1 ? (
        <UsernameAndMobilOrEmailStep via="email" />
      ) : localRegisterStep === 2 ? (
        <NameAndPasswordStep via="email" />
      ) : localRegisterStep === 3 ? (
        <VerificationCodeStep via="email" />
      ) : null}
    </>
  );
}

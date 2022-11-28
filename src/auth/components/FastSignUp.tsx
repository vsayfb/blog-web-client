import { useDispatch } from "react-redux";
import { BlurArea } from "../../lib/components/BlurArea";
import { hideFastSignUp } from "../../lib/slices/appSlice";
import { BackSVG } from "../../lib/svgs/BackSVG";
import SignUp from "../../screens/SignUp";

export const FastSignUp = () => {
  const dispatch = useDispatch();

  return (
    <BlurArea zindex={200000}>
      <>
        <div
          className="pl-6 cursor-pointer"
          onClick={() => dispatch(hideFastSignUp())}
        >
          <BackSVG w={40} h={40} />
        </div>
        <SignUp />
      </>
    </BlurArea>
  );
};

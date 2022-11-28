import { useDispatch } from "react-redux";
import { BlurArea } from "../../lib/components/BlurArea";
import { hideFastSignIn } from "../../lib/slices/appSlice";
import { BackSVG } from "../../lib/svgs/BackSVG";
import SignIn from "../../screens/SignIn";

export const FastSignIn = () => {
  const dispatch = useDispatch();

  return (
    <BlurArea zindex={200000}>
      <>
        <div
          className="pl-6 cursor-pointer"
          onClick={() => dispatch(hideFastSignIn())}
        >
          <BackSVG w={40} h={40} />
        </div>
        <SignIn />
      </>
    </BlurArea>
  );
};

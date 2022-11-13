import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, setMe } from "../../../auth/slices/authSlice";
import { MyButton } from "../../../lib/components/Button";
import { sendRequest } from "../../../lib/sendRequest";
import { setError, setLoading } from "../../../lib/slices/appSlice";
import { RootState } from "../../../store";
import { AccountViewDto } from "../../types/account-view-dto";
import { UpdateDisplayName } from "./UpdateDisplayName";
import { UpdateUsername } from "./UpdateUsername";

type UpdatedProfilDto = {
  data: {
    account: {
      data: AccountViewDto;
      message: "Account has been updated.";
    };
    access_token: string;
  };
};

export const UpdatePublicProfile = () => {
  const { me, updatedMe } = useSelector((state: RootState) => state.auth);

  const disabledButtonColor = "bg-zinc-400";

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const sameDisplays = me.display_name === updatedMe.display_name;
    const sameNames = me.username === updatedMe.username;

    if (updatedMe.validationError) {
      setButtonDisabled(true);
    } else if (sameDisplays && sameNames) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [updatedMe]);

  async function updateProfile() {
    dispatch(setLoading());

    try {
      const result: UpdatedProfilDto = await sendRequest(
        `accounts/${me.sub}`,
        "put",
        true,
        {
          username: updatedMe.username,
          display_name: updatedMe.display_name,
        }
      );

      dispatch(setMe(result.data.account));

      localStorage.setItem("token", `Bearer ${result.data.access_token}`);
    } catch (error: any) {
      dispatch(setError(error.response.data.message[0]));
    } finally {
      dispatch(setLoading());
    }
  }

  return (
    <>
      <div className="mt-5">
        <UpdateUsername />
      </div>
      <div className="mt-5">
        <UpdateDisplayName />
      </div>

      <div className="mt-5">
        <MyButton
          buttonText="Update Profile"
          onClickEvent={() => updateProfile()}
          classProperties={`w-48 ${buttonDisabled ? disabledButtonColor : ""}`}
          disabled={buttonDisabled}
        />
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMe } from "../../../auth/slices/authSlice";
import { MyButton } from "../../../lib/components/Button";
import { sendRequest } from "../../../lib/sendRequest";
import { setError, setLoading } from "../../../lib/slices/appSlice";
import { RootState } from "../../../store";
import { AccountViewDto } from "../../../accounts/types/account-view-dto";
import { UpdateDisplayName } from "./UpdateDisplayName";
import { UpdateUsername } from "./UpdateUsername";
import { setLocalStorageToken } from "../../../lib/setLocalStorageToken";

export type UpdatedProfileDto = {
  data: {
    account: AccountViewDto;
    access_token: string;
  };
  message: "Account has been updated.";
};

export const UpdatePublicProfile = () => {
  const { me, updatedMe } = useSelector((state: RootState) => state.auth);

  const [firstButtonDisabled, setFirstButtonDisabled] = useState(true);
  const [secondButtonDisabled, setSecondButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const sameDisplays = me.display_name === updatedMe.display_name;
    const sameNames = me.username === updatedMe.username;

    if (sameDisplays) {
      setFirstButtonDisabled(true);
    } else {
      setFirstButtonDisabled(false);
    }

    if (sameNames) {
      setSecondButtonDisabled(true);
    } else {
      setSecondButtonDisabled(false);
    }

    if (updatedMe.validationError) {
      setSecondButtonDisabled(true);
      setFirstButtonDisabled(true);
    }
  }, [updatedMe]);

  async function updateDisplayName() {
    dispatch(setLoading());

    try {
      const result: UpdatedProfileDto = await sendRequest(
        `profiles/update_display_name/account/${me.sub}`,
        "patch",
        true,
        {
          display_name: updatedMe.display_name,
        }
      );

      dispatch(setMe({ display_name: updatedMe.display_name }));

      setLocalStorageToken(result.data.access_token);
    } catch (error: any) {
      dispatch(setError(error.response.data.message[0]));
    } finally {
      dispatch(setLoading());
    }
  }

  async function updateUsername() {
    dispatch(setLoading());

    try {
      const result: UpdatedProfileDto = await sendRequest(
        `accounts/username/${me.sub}`,
        "patch",
        true,
        {
          username: updatedMe.username,
        }
      );

      dispatch(setMe({ username: result.data.account.username }));

      setLocalStorageToken(result.data.access_token);
    } catch (error: any) {
      dispatch(setError(error.response.data.message[0]));
    } finally {
      dispatch(setLoading());
    }
  }

  return (
    <>
      <div className="mt-5">
        <UpdateDisplayName />

        <div className="mt-5">
          <button
            className={`text-white rounded px-4 py-4 flex justify-center items-center w-48 text-sm font-semibold focus:outline-none ${
              firstButtonDisabled ? "bg-zinc-400" : "bg-zinc-900 "
            }`}
            type="button"
            onClick={updateDisplayName}
            disabled={firstButtonDisabled}
          >
            UPDATE
          </button>
        </div>
      </div>

      <div className="mt-5">
        <UpdateUsername />

        <div className="mt-5">
          <button
            className={`text-white rounded px-4 py-4 flex justify-center items-center w-48 text-sm font-semibold focus:outline-none ${
              secondButtonDisabled ? "bg-zinc-400" : "bg-zinc-900 "
            }`}
            type="button"
            onClick={updateUsername}
            disabled={secondButtonDisabled}
          >
            UPDATE
          </button>
        </div>
      </div>
    </>
  );
};

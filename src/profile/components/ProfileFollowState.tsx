import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendRequest } from "../../lib/sendRequest";
import { setError, showFastSignUp } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { decreaseFollowers, increaseFollowers } from "../slices/profileSlice";

export const ProfileFollowState = ({
  following,
  followers,
}: {
  following: number;
  followers: number;
}) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const { me } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  async function followProfile() {
    if (profile) {
      if (!me.username) {
        dispatch(showFastSignUp());
      } else {
        try {
          await sendRequest(`follow/${profile.username}`, "post", true);

          dispatch(increaseFollowers());
        } catch (error: any) {
          dispatch(setError(error.response.data.message));
        }
      }
    }
  }

  async function unfollowProfile() {
    if (profile) {
      try {
        const prof = await sendRequest(
          `follow/${profile.username}`,
          "delete",
          true
        );

        console.log(prof);

        dispatch(decreaseFollowers());
      } catch (error: any) {
        dispatch(setError(error.response.data.message));
      }
    }
  }

  if (!profile) return null;

  return (
    <>
      <div className="mb-5 flex justify-between">
        <div>
          <div className="">Following</div>
          <b className="flex justify-center ">{following}</b>
        </div>
        <div>
          <div>Followers</div>
          <b className="flex justify-center">{followers}</b>
        </div>
      </div>

      <div>
        {me.sub === profile.id ? (
          <Link
            className="bg-zinc-900 text-white rounded-md w-full block p-2"
            style={{ marginTop: "16px" }}
            to="/settings"
          >
            Edit Profile
          </Link>
        ) : (
          <button
            className="bg-zinc-900 text-white rounded-md w-full  p-2"
            style={{ marginTop: "16px" }}
            onClick={
              profile.following_by
                ? () => unfollowProfile()
                : () => followProfile()
            }
          >
            {profile.following_by ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    </>
  );
};

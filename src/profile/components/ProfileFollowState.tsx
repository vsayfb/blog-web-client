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
      <div className="p-2 flex justify-center rounded-md dark:text-coolGray-100 ">
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 fill-current cursor-pointer"
        >
          <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
        </svg>
      </div>
    </>
  );
};

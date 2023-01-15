import { Subscriptions } from "../../subscriptions/Subscriptions";
import { ProfileViewDto } from "../types/profile-view.dto";
import { ProfileFollowState } from "./ProfileFollowState";
import { ProfileImage } from "./ProfileImage";

export const ProfileCard = ({
  profile,
}: {
  profile: ProfileViewDto["data"];
}) => {
  console.log(profile);

  return (
    <div className="flex flex-col justify-center max-w-xs p-6 w-full shadow-md rounded-xl sm:px-12 ">
      <ProfileImage url={profile.image} />
      <div className="space-y-4 text-center divide-y divide-coolGray-700">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {profile.display_name}
          </h2>

          <ProfileFollowState
            following={profile.following_count}
            followers={profile.followers_count}
          />

          {profile.following_by ? (
            <Subscriptions
              accountID={profile.id}
              subscriptions={profile.subscriptions_by}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

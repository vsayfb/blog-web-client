import { profileEnd } from "console";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../lib/components/Spinner";
import { sendRequest } from "../../lib/sendRequest";
import { NotFound } from "../../screens/NotFound";
import { RootState } from "../../store";
import { resetProfile, setProfile } from "../slices/profileSlice";
import { ProfileViewDto } from "../types/profile-view.dto";
import { ProfileArea } from "./ProfileArea";
import { ProfileCard } from "./ProfileCard";
import { ProfileRight } from "./ProfileRight";

export const Profile = () => {
  const { username } = useParams();

  const { profile } = useSelector((state: RootState) => state.profile);

  const [profileLoading, setProfileLoading] = useState(true);

  const dispatch = useDispatch();

  async function getProfile(): Promise<ProfileViewDto | null> {
    const result = await sendRequest(
      `accounts/profile/${username}`,
      "get",
      true
    );

    return result.data.id ? result : null;
  }

  useEffect(() => {
    setProfileLoading(true);

    getProfile()
      .then((p) => {
        if (p) dispatch(setProfile(p.data));
      })
      .finally(() => {
        setProfileLoading(false);
      });

    return () => {
      dispatch(resetProfile());
    };
  }, [username]);

  if (!profile) {
    if (profileLoading) {
      return (
        <ProfileArea>
          <div
            className="col-span-12 lg:col-span-3 flex justify-center items-center"
            style={{ height: "300px" }}
          >
            <Spinner w={40} h={40} />
          </div>
        </ProfileArea>
      );
    }

    return (
      <NotFound
        message="We could not find this profile."
        pageTitle="404 - Profile Not Found"
      />
    );
  }

  return (
    <ProfileArea>
      <Helmet>
        <title>User {profile.display_name}</title>
      </Helmet>

      <div className="col-span-12 lg:col-span-3 flex justify-center">
        <ProfileCard profile={profile} />
      </div>

      <div className="relative col-span-12  space-y-6 sm:col-span-9">
        <ProfileRight profile={profile} />
      </div>
    </ProfileArea>
  );
};

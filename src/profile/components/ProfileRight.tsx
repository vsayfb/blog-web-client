import { useEffect, useState } from "react";
import { sendRequest } from "../../lib/sendRequest";
import { ProfileViewDto } from "../types/profile-view.dto";
import { CommentsTab } from "./tabs/CommentsTab";
import { PostsTab } from "./tabs/PostsTab";

export const ProfileRight = ({
  profile,
}: {
  profile: ProfileViewDto["data"];
}) => {
  type Tabs = "posts" | "comments";

  const [openedTab, setOpenedTab] = useState<Tabs>("posts");

  useEffect(() => {
    setOpenedTab("posts");
  }, []);

  return (
    <>
      <div className="flex items-center ">
        <button
          className={`ml-4 px-5 py-1 border-b-2 ${
            openedTab === "posts" && "border-emerald-500"
          } `}
          onClick={() => setOpenedTab("posts")}
        >
          Posts
        </button>
        <button
          className={`ml-4 px-5 py-1 border-b-2  ${
            openedTab === "comments" && "border-emerald-500"
          } `}
          onClick={() => setOpenedTab("comments")}
        >
          Comments
        </button>
      </div>
      {openedTab === "posts" ? (
        <PostsTab userID={profile.id} />
      ) : (
        <CommentsTab userID={profile.id} />
      )}
    </>
  );
};

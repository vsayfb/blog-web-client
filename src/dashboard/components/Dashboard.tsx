import { useEffect, useState } from "react";
import { Me } from "../../auth/slices/authSlice";
import { DashboardPosts } from "./DashboardPosts";
import Spinner from "../../lib/components/Spinner";
import { DashboardBookmarks } from "./DashboardBookmarks";

export const Dashboard = ({ me }: { me: Me }) => {
  const [tab, setTab] = useState<"posts" | "bookmarks">();

  useEffect(() => {
    setTab("posts");
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 lg:px-8 h-screen  ">
      <div className="flex items-center ">
        <button
          className={`ml-4 px-5 py-1 border-b-2 ${
            tab === "posts" && "border-zinc-900"
          } `}
          onClick={() => setTab("posts")}
        >
          Posts
        </button>
        <button
          className={`ml-4 px-5 py-1 border-b-2  ${
            tab === "bookmarks" && "border-zinc-900"
          } `}
          onClick={() => setTab("bookmarks")}
        >
          Bookmarks
        </button>
      </div>

      {tab === "posts" ? (
        <DashboardPosts />
      ) : tab === "bookmarks" ? (
        <DashboardBookmarks />
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ height: "60%" }}
        >
          <Spinner h={80} w={80} />
        </div>
      )}
    </div>
  );
};

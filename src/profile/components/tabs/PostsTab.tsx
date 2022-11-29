import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../lib/components/Spinner";
import { sendRequest } from "../../../lib/sendRequest";

export type ProfilePostViewDto = {
  title: string;
  url: string;
  id: string;
  published: boolean;
  content: string;
  title_image: string | null;
  created_at: Date;
  updated_at: Date;
};

export const PostsTab = ({ userID }: { userID: string }) => {
  const [postsLoading, setPostsLoading] = useState(true);

  const [posts, setPosts] = useState<ProfilePostViewDto[]>([]);

  async function getPosts() {
    const result = await sendRequest(`posts/account/${userID}`, "get", false);

    return result.data;
  }

  useEffect(() => {
    getPosts()
      .then((p) => {
        setPosts(p);
      })
      .finally(() => {
        setPostsLoading(false);
      });
  }, []);

  if (!posts.length) {
    if (postsLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Spinner w={70} h={70} />
        </div>
      );
    }
    return <h3> User have not share any post. </h3>;
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.url}
          className={`flex flex-col border-b border-zinc-900 pb-2`}
        >
          <Link
            to={`/${post.url}`}
            className="text-xl font-semibold tracking-wide mb-3"
          >
            {post.title}
          </Link>
          <time className="text-xs tracking-wide uppercase ">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>
      ))}
    </>
  );
};

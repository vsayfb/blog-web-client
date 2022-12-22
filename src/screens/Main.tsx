import { useEffect, useState } from "react";
import { getPosts } from "../lib/api/post";
import Spinner from "../lib/components/Spinner";
import { PostCard } from "../posts/components/PostCard";
import { AllPostViewDto } from "../posts/types/all-post-view.dto";

export default function Main() {
  const [posts, setPosts] = useState<AllPostViewDto>([]);

  const [postsLoading, setPostsLoading] = useState(true);

  async function getAll() {
    const { data } = await getPosts();

    return data;
  }

  useEffect(() => {
    getAll()
      .then((p) => setPosts(p))
      .finally(() => setPostsLoading(false));
  }, []);

  if (!posts.length) {
    if (postsLoading) {
      return (
        <div className="flex justify-center items-center h-screen py-16">
          <Spinner h={80} w={80} />
        </div>
      );
    }

    return (
      <div className="pl-16 h-screen py-16">
        <h1>There are no posts to show.</h1>
      </div>
    );
  }

  return (
    <div>
      <main className="bg-slate-900">
        <section className="">
          <div className="px-6 mx-auto">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-5/5 px-4 ">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

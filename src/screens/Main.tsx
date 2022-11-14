import { useEffect, useState } from "react";
import { getPosts } from "../lib/api/post";
import { PostCard } from "../posts/components/PostCard";
import { PostViewDto } from "../posts/types/post-view.dto";

export default function Main() {
  const [posts, setPosts] = useState<PostViewDto[]>([]);

  async function getAll() {
    const { data } = await getPosts();

    setPosts(data);
  }

  useEffect(() => {
    getAll();
  }, []);

  if (!posts.length)
    return (
      <div className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 h-screen"></div>
    );

  return (
    <div className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700">
      <main className="  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 ">
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

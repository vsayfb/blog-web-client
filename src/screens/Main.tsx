import axios from "axios";
import { useEffect, useState } from "react";
import { PostViewDto } from "../lib/types/post";
import { PostCard } from "../posts/components/PostCard";

export default function Main() {
  const [posts, setPosts] = useState<PostViewDto[]>([]);

  async function getAll() {
    const { data } = await axios.get("http://localhost:5555/api/v1/posts");

    setPosts(data);
  }

  useEffect(() => {
    getAll();
  }, []);

  if (!posts.length) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
  );
}

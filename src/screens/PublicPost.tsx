import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Me } from "../auth/slices/authSlice";
import { getPublicPost } from "../lib/api/post";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { PostElement } from "../posts/components/PostElement";
import { Helmet } from "react-helmet";
import { NotFound } from "./NotFound";
import { PostViewDto } from "../posts/types/post-view.dto";
import Spinner from "../lib/components/Spinner";

export const PublicPost = ({ me }: { me: Me }) => {
  const [post, setPost] = useState<PostViewDto | null>(null);

  const [postLoading, setPostLoading] = useState(true);

  const { url } = useParams();

  async function getPost(postUrl: string) {
    const result = await getPublicPost(postUrl);
    return result.data;
  }

  useEffect(() => {
    setPostLoading(true);

    getPost(url as string)
      .then((p) => {
        setPost(p);
      })
      .finally(() => {
        setPostLoading(false);
        window.scrollTo(0, 0);
      });
  }, [url]);

  useEffect(() => {
    if (post && post.id) Prism.highlightAll();
  }, [post]);

  if (!post) {
    if (postLoading) {
      return (
        <div className="flex justify-center items-center  h-screen pb-10 ">
          <Spinner w={90} h={90} />
        </div>
      );
    }
    return <NotFound />;
  }

  return (
    <div>
      <Helmet>
        <title> {post.title}</title>

        <meta name="description" content={post.content.slice(0, 160)} />
      </Helmet>
      <PostElement post={post} />;
    </div>
  );
};

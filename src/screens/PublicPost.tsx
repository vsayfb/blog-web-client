import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Me } from "../lib/slices/authSlice";
import { getAPost } from "../lib/api/post";
import { PostViewDto } from "../lib/types/post";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { PostElement } from "../lib/components/PostElement";
import { Helmet } from "react-helmet";
import { NotFound } from "./NotFound";

export const PublicPost = ({ me }: { me: Me }) => {
  const [post, setPost] = useState<PostViewDto>();

  const [notFound, setNotFound] = useState(false);

  const { url } = useParams();

  async function get(postUrl: string) {
    try {
      const data = await getAPost(postUrl);
      setPost(data);
    } catch (error: any) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    if (url) get(url);
  }, [url]);

  useEffect(() => {
    if (post && post.id) Prism.highlightAll();
  }, [post]);

  if (notFound) return <NotFound />;

  if (!post) return null;

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

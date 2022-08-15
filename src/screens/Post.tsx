import Prism from "prismjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostElement } from "../lib/components/PostElement";
import { getPost } from "../lib/api/post";
import { PostViewDto } from "../lib/types/post";

export const Post = () => {
  const [post, setPost] = useState<PostViewDto>();

  const { id } = useParams();

  async function get(postID: string) {
    const post = await getPost(postID);
    setPost(post.data);
  }

  useEffect(() => {
    if (id) get(id);
  }, [id]);

  useEffect(() => {
    if (post && post.id) Prism.highlightAll();
  }, [post]);

  if (!post) return null;

  return <PostElement post={post} />;
};

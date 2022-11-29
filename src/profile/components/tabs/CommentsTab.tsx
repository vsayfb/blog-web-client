import { Link } from "react-router-dom";
import { ProfilePostViewDto } from "./PostsTab";
import Prism from "prismjs";
import { HashLink } from "react-router-hash-link";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useState } from "react";
import { sendRequest } from "../../../lib/sendRequest";
import Spinner from "../../../lib/components/Spinner";

export type ProfileCommentsViewDto = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  post: ProfilePostViewDto;
};

export const CommentsTab = ({ userID }: { userID: string }) => {
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [comments, setComments] = useState<ProfileCommentsViewDto[]>([]);

  async function getComments() {
    const result = await sendRequest(
      `comments/account/${userID}`,
      "get",
      false
    );

    return result.data;
  }

  useEffect(() => {
    getComments()
      .then((c) => {
        setComments(c);
      })
      .finally(() => {
        setCommentsLoading(false);
      });
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [comments]);

  if (!comments.length) {
    if (commentsLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Spinner w={70} h={70} />
        </div>
      );
    }
    return <h3> User have not share any comment. </h3>;
  }

  return (
    <>
      {comments.map((c) => (
        <div
          key={c.id}
          className={`flex flex-col border-b border-zinc-900 pb-2`}
        >
          <HashLink
            smooth={true}
            elementId={c.id.toString()}
            to={`/${c.post.url}#${c.id}`}
            dangerouslySetInnerHTML={{ __html: c.content }}
          ></HashLink>

          <time className="text-xs tracking-wide uppercase mt-2 ">
            {new Date(c.created_at).toLocaleDateString()}
          </time>
        </div>
      ))}
    </>
  );
};

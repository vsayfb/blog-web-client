import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { ChatIconSVG } from "../../lib/svgs/ChatIconSVG";
import { RootState } from "../../store";
import {
  resetCommentTree,
  resetCommentViewHistory,
  resetPostComments,
  setPostComments,
} from "../slices/commentsSlice";
import { CommentReplies } from "./CommentReplies";
import { WritePostComment } from "./WritePostComment";
import { CommentTreeCard } from "./CommentTreeCard";
import { PostCommentCard } from "./PostCommentCard";

export const PostComments = ({ postID }: { postID: string }) => {
  const { postComments } = useSelector((state: RootState) => state.comments);

  const dispatch = useDispatch();

  async function getPostComments() {
    const { data } = await sendRequest(`comments/post/${postID}`, "get", true);

    return data;
  }

  useEffect(() => {
    getPostComments()
      .then((comments) => {
        dispatch(setPostComments(comments));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });

    return () => {
      dispatch(resetPostComments());
      dispatch(resetCommentTree());
      dispatch(resetCommentViewHistory());
    };
  }, [postID]);

  return (
    <div>
      <CommentReplies />

      <WritePostComment postID={postID} />

      <div className="flex mt-20  items-center ">
        <div>
          <ChatIconSVG />
        </div>

        <div className="ml-2">
          <h3 className={` font-semibold `}>Comments</h3>
        </div>
      </div>

      {postComments.map((c) => (
        <PostCommentCard key={c.id} comment={c} />
      ))}
    </div>
  );
};

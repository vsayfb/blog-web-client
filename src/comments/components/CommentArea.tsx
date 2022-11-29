import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { ChatIconSVG } from "../../lib/svgs/ChatIconSVG";
import { FontSVG } from "../../lib/svgs/FontSVG";
import { RootState } from "../../store";
import { resetComments, setComments } from "../slices/commentsSlice";
import { CommentViewDto } from "../types/comment-view.dto";
import { CommentCard } from "./CommentCard";
import { CommentReplies } from "./CommentReplies";
import { WriteComment } from "./WriteComment";

export const CommentArea = ({ postID }: { postID: string }) => {
  const { comments } = useSelector((state: RootState) => state.comments);

  const dispatch = useDispatch();

  async function getPostComments() {
    const { data } = await sendRequest(`comments/post/${postID}`, "get", false);

    return data;
  }

  useEffect(() => {
    getPostComments()
      .then((comments) => {
        dispatch(setComments(comments));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });

    return () => {
      dispatch(resetComments());
    };
  }, [postID]);

  return (
    <div>
      <CommentReplies />

      <div className="flex mt-12 mb-4 items-center ">
        <div>
          <ChatIconSVG />
        </div>

        <div className="ml-2">
          <h3 className={` font-semibold `}>Comments</h3>
        </div>
      </div>

      <WriteComment postID={postID} />

      {comments.map((c: CommentViewDto) => (
        <CommentCard comment={c} />
      ))}
    </div>
  );
};

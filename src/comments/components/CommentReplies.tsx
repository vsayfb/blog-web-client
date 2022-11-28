import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BlurArea } from "../../lib/components/BlurArea";
import { detectImage } from "../../lib/detectImage";
import { sendRequest } from "../../lib/sendRequest";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { RootState } from "../../store";
import {
  addCommentToHistory,
  getPreviousComment,
} from "../slices/commentsSlice";
import { CommentViewDto } from "../types/comment-view.dto";
import { CommentAuthor } from "./CommentAuthor";
import { CommentBody } from "./CommentBody";
import { CommentCard } from "./CommentCard";
import { CommentStats } from "./CommentStats";

export const CommentReplies = () => {
  const dispatch = useDispatch();

  const { comment } = useSelector((state: RootState) => state.comments.replies);

  const [replies, setReplies] = useState<CommentViewDto[]>([]);

  async function getReplies(commentID: string) {
    const result = await sendRequest(
      "comments/reply/" + commentID,
      "get",
      true
    );

    return result;
  }

  useEffect(() => {
    if (comment) {
      getReplies(comment.id).then((r) => {
        setReplies(r.data);
      });
    }
  }, [comment]);

  function showPreviousComment() {
    dispatch(getPreviousComment());
  }

  if (comment) {
    return (
      <BlurArea>
        <>
          <div className="ml-6 cursor-pointer" onClick={showPreviousComment}>
            <BackSVG w={30} h={30} />
          </div>

          <div className="w-full flex justify-center ">
            <div className="" style={{ width: "80%" }}>
              <div className="flex ">
                <div className="pr-4" style={{ width: "90px" }}>
                  <CommentAuthor author={comment.author} />

                  <div className="text-xs text-center text-zinc-900 ml-2 mt-2">
                    {moment(comment.created_at).fromNow()}
                  </div>

                  <div className="flex justify-evenly pt-2 pb-2">
                    <CommentStats
                      commentID={comment.id}
                      dislike_count={comment.dislike_count}
                      like_count={comment.like_count}
                    />
                  </div>
                </div>

                <div className="relative flex-1 px-4 py-2  border-b border-zinc-900 pb-2 sm:px-6 sm:py-4 ">
                  <CommentBody content={comment.content} />
                </div>
              </div>

              {replies.map((r) => (
                <CommentCard comment={r} />
              ))}
            </div>
          </div>
        </>
      </BlurArea>
    );
  } else return null;
};

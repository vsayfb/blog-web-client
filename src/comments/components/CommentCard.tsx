import { Link } from "react-router-dom";
import { detectImage } from "../../lib/detectImage";
import { AppColors } from "../../lib/slices/appSlice";
import { CommentViewDto } from "../types/comment-view.dto";
import { RemoveComment } from "./DeleteComment";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import moment from "moment";
import { LikeSVG } from "../../lib/svgs/LikeSVG";
import { DislikeSVG } from "../../lib/svgs/DislikeSVG";
import { CommentStats } from "./CommentStats";
import { ReplySVG } from "../../lib/svgs/ReplySVG";
import { ReplyToComment } from "./ReplyToComment";
import { useDispatch } from "react-redux";
import {
  addCommentToHistory,
  showCommentReplies,
} from "../slices/commentsSlice";
import { CommentAuthor } from "./CommentAuthor";
import { CommentBody } from "./CommentBody";

export const CommentCard = ({ comment }: { comment: CommentViewDto }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const dispatch = useDispatch();

  const [replyEditorVisibility, setReplyEditorVisibility] = useState(false);

  function showReplies() {
    dispatch(addCommentToHistory(comment));
    dispatch(showCommentReplies(comment));
  }

  return (
    <>
      <div className="mt-20 mb-12" id={comment.id}>
        <div className="flex">
          <div className="pr-4" style={{ width: "90px" }}>
            <CommentAuthor author={comment.author} />

            <div className="text-xs text-center text-zinc-900 ml-2 mt-2">
              {moment(comment.created_at).fromNow()}
            </div>

            <div className="flex items-center justify-evenly pt-2 pb-2">
              <CommentStats
                commentID={comment.id}
                like_count={comment.like_count}
                dislike_count={comment.dislike_count}
              />
            </div>
          </div>
          <div
            className={`relative flex-1 border-b border-zinc-900  px-4 py-2 sm:px-6 sm:py-4 `}
          >
            <CommentBody content={comment.content} />

            <div className="absolute bottom-2 flex items-center">
              <div
                className="text-sm text-gray-500 font-semibold cursor-pointer"
                onClick={showReplies}
              >
                {comment.reply_count} Replies
              </div>

              <span
                className="ml-4 cursor-pointer"
                onClick={() => setReplyEditorVisibility(true)}
              >
                <ReplySVG />
              </span>
            </div>
          </div>
        </div>

        {replyEditorVisibility ? (
          <div className="bottom-0">
            <ReplyToComment
              comment={comment}
              setReplyEditorVisibility={setReplyEditorVisibility}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

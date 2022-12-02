import { CommentViewDto } from "../types/comment-view.dto";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import moment from "moment";
import { CommentStats } from "./CommentStats";
import { ReplySVG } from "../../lib/svgs/ReplySVG";
import { ReplyToComment } from "./ReplyToComment";
import { useDispatch, useSelector } from "react-redux";

import { CommentAuthor } from "./CommentAuthor";
import { CommentBody } from "./CommentBody";
import {
  leaveExpressionCommentInTree,
  removeCommentFromTree,
  removeReplyExpressionInTree,
  setBaseComment,
} from "../slices/commentsSlice";
import { sendRequest } from "../../lib/sendRequest";
import { FillReplySVG } from "../../lib/svgs/FillReplySVG";
import { DeleteSVG } from "../../lib/svgs/DeleteSVG";
import { UpdateSVG } from "../../lib/svgs/UpdateSVG";
import { RootState } from "../../store";
import { UpdateComment } from "./UpdateComment";

export const CommentTreeCard = ({
  comment,
  openCommentReplies = true,
}: {
  comment: CommentViewDto;
  openCommentReplies?: boolean;
}) => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  const [replyEditorVisibility, setReplyEditorVisibility] = useState(false);

  const [updateEditorVisibility, setUpdateEditorVisibility] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function showCommentTree() {
    dispatch(setBaseComment(comment));
  }

  async function removeComment() {
    await sendRequest(`comments/${comment.id}`, "delete", true);

    dispatch(removeCommentFromTree({ id: comment.id }));
  }

  async function likeExpression(commentID: string) {
    await sendRequest(`expressions/like/comment/${commentID}`, "post", true);
  }

  async function dislikeExpression(commentID: string) {
    await sendRequest(`expressions/dislike/comment/${commentID}`, "post", true);
  }

  async function removeExpression(commentID: string) {
    await sendRequest(`expressions/comment/${commentID}`, "delete", true);
  }

  async function likeComment(commentID: string) {
    if (comment.liked_by) {
      dispatch(removeReplyExpressionInTree({ id: commentID, exp: "like" }));
      await removeExpression(commentID);
    } else if (comment.disliked_by) {
      //
      await removeExpression(commentID);
      dispatch(removeReplyExpressionInTree({ id: commentID, exp: "dislike" }));

      await likeExpression(commentID);
      dispatch(leaveExpressionCommentInTree({ id: commentID, type: "like" }));
    } else {
      await likeExpression(commentID);
      dispatch(leaveExpressionCommentInTree({ id: commentID, type: "like" }));
    }
  }

  async function dislikeComment(commentID: string) {
    if (comment.disliked_by) {
      dispatch(removeReplyExpressionInTree({ id: commentID, exp: "dislike" }));
      await removeExpression(commentID);
    } else if (comment.liked_by) {
      //
      await removeExpression(commentID);
      dispatch(removeReplyExpressionInTree({ id: commentID, exp: "like" }));

      await dislikeExpression(commentID);
      dispatch(
        leaveExpressionCommentInTree({ id: commentID, type: "dislike" })
      );
    } else {
      await dislikeExpression(commentID);
      dispatch(
        leaveExpressionCommentInTree({ id: commentID, type: "dislike" })
      );
    }
  }

  return (
    <>
      <div className="mt-20 mb-12" id={comment.id}>
        <div className="flex">
          <div className="pr-4" style={{ width: "160px" }}>
            <CommentAuthor author={comment.author} />

            <div className="text-xs text-center text-zinc-900 ml-2 mt-2">
              {moment(comment.created_at).fromNow()}
            </div>

            <div className="flex items-center justify-evenly pt-2 pb-2">
              <CommentStats
                comment={comment}
                likeCommentFn={likeComment}
                dislikeCommentFn={dislikeComment}
              />
            </div>
          </div>
          <div className={`relative flex-1  px-4 py-2 sm:px-6 sm:py-4 `}>
            {me.sub === comment.author.id && (
              <div className="flex absolute -top-3 ">
                <span
                  className="ml-auto cursor-pointer"
                  onClick={() => setUpdateEditorVisibility((pr) => !pr)}
                >
                  <UpdateSVG />
                </span>

                <span className="ml-4 cursor-pointer" onClick={removeComment}>
                  <DeleteSVG />
                </span>
              </div>
            )}

            {updateEditorVisibility ? (
              <UpdateComment
                commentID={comment.id}
                oldContent={comment.content}
                setEditorVisibility={(value) =>
                  setUpdateEditorVisibility(value)
                }
              />
            ) : (
              <CommentBody content={comment.content} />
            )}

            {!updateEditorVisibility && (
              <div className="absolute bottom-2 flex items-center">
                {openCommentReplies ? (
                  comment.reply_count ? (
                    <div
                      className="text-sm text-emerald-500 font-semibold cursor-pointer"
                      onClick={showCommentTree}
                    >
                      {comment.reply_count} Replies
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 font-semibold">
                      0 Replies
                    </div>
                  )
                ) : (
                  <div className="text-sm text-emerald-500 font-semibold">
                    {comment.reply_count} Replies
                  </div>
                )}

                <span
                  className="ml-4 cursor-pointer"
                  onClick={() => setReplyEditorVisibility((p) => !p)}
                >
                  {replyEditorVisibility ? <FillReplySVG /> : <ReplySVG />}
                </span>
              </div>
            )}
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

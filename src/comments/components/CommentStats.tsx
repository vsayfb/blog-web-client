import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { showFastSignUp } from "../../lib/slices/appSlice";
import { DislikeFillSVG } from "../../lib/svgs/DislikeFillSVG";
import { DislikeSVG } from "../../lib/svgs/DislikeSVG";
import { LikeFillSVG } from "../../lib/svgs/LikeFillSVG";
import { LikeSVG } from "../../lib/svgs/LikeSVG";
import { RootState } from "../../store";

import { CommentViewDto } from "../types/comment-view.dto";

export const CommentStats = ({
  comment,
  likeCommentFn,
  dislikeCommentFn,
}: {
  comment: CommentViewDto;
  likeCommentFn: Function;
  dislikeCommentFn: Function;
}) => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  async function likeComment() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
      likeCommentFn(comment.id);
    }
  }

  async function dislikeComment() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
    dislikeCommentFn(comment.id);}
  }

  return (
    <>
      <div className="text-center ">
        {comment.author.id === me.sub ? (
          <div>
            {comment.liked_by ? (
              <LikeFillSVG w={22} h={22} />
            ) : (
              <LikeSVG w={22} h={22} />
            )}
          </div>
        ) : (
          <div onClick={likeComment} className="cursor-pointer">
            {comment.liked_by ? (
              <LikeFillSVG w={22} h={22} />
            ) : (
              <LikeSVG w={22} h={22} />
            )}
          </div>
        )}
        <div className="text-sm">{comment.like_count}</div>
      </div>

      <div className="text-center">
        {comment.author.id === me.sub ? (
          <div>
            {comment.disliked_by ? (
              <DislikeFillSVG w={22} h={22} />
            ) : (
              <DislikeSVG w={22} h={22} />
            )}
          </div>
        ) : (
          <div onClick={dislikeComment} className="cursor-pointer">
            {comment.disliked_by ? (
              <DislikeFillSVG w={22} h={22} />
            ) : (
              <DislikeSVG w={22} h={22} />
            )}
          </div>
        )}
        <div className="text-sm">{comment.dislike_count}</div>
      </div>
    </>
  );
};

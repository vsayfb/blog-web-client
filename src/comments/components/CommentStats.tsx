import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError, showFastSignUp } from "../../lib/slices/appSlice";
import { DislikeSVG } from "../../lib/svgs/DislikeSVG";
import { LikeSVG } from "../../lib/svgs/LikeSVG";
import { RootState } from "../../store";

export const CommentStats = ({
  commentID,
  like_count,
  dislike_count,
}: {
  commentID: string;
  like_count: number;
  dislike_count: number;
}) => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  const [likeCount, setLikeCount] = useState(like_count);
  const [dislikeCount, setDislikeCount] = useState(dislike_count);

  async function removeExpression() {
    await sendRequest(`expressions/comment/${commentID}`, "delete", true);
  }

  async function likeComment() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
      try {
        await sendRequest(
          `expressions/like/comment/${commentID}`,
          "post",
          true
        );
        setLikeCount((p) => ++p);
      } catch (error: any) {
        // dispatch(setError(error.response.data.message));
        removeExpression();
        setLikeCount((p) => --p);
      }
    }
  }

  async function dislikeComment() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
      try {
        await sendRequest(
          `expressions/dislike/comment/${commentID}`,
          "post",
          true
        );
        setDislikeCount((p) => ++p);
      } catch (error: any) {
        // dispatch(setError(error.response.data.message));
        removeExpression();
        setDislikeCount((p) => --p);
      }
    }
  }

  return (
    <>
      <div className="text-center ">
        <div onClick={likeComment} className="cursor-pointer">
          <LikeSVG w={18} h={18} />
        </div>
        <div className="text-sm">{likeCount}</div>
      </div>

      <div className="text-center">
        <div onClick={dislikeComment} className="cursor-pointer">
          <DislikeSVG w={18} h={18} />
        </div>
        <div className="text-sm">{dislikeCount}</div>
      </div>
    </>
  );
};

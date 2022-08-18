import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { resetComments, setComments } from "../slices/commentsSlice";
import { CommentCard } from "./CommentCard";
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
      <h3 className="mb-4 mt-12 text-lg font-semibold text-orange-200">
        Comments
      </h3>

      <WriteComment postID={postID} />

      {comments.map((c) => (
        <CommentCard comment={c} />
      ))}
    </div>
  );
};

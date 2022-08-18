import { useDispatch } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { removeComment } from "../slices/commentsSlice";

export const RemoveComment = ({ commentID }: { commentID: string }) => {
  const dispatch = useDispatch();

  async function deleteComment() {
    try {
      const result = await sendRequest(`comments/${commentID}`, "delete", true);

      dispatch(removeComment(result.id));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  }

  return (
    <b className="text-red-500 cursor-pointer" onClick={deleteComment}>
      X
    </b>
  );
};

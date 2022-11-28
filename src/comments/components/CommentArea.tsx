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

  const { colors, theme } = useSelector((root: RootState) => root.app);

  const [commentEditorVisibility, setCommentEditorVisibility] = useState(false);

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
          <h3
            className={` font-semibold ${
              theme === "dark"
                ? "text-" + colors.zinc50
                : "text-" + colors.zinc900
            }`}
          >
            Comments
          </h3>
        </div>
      </div>

      <WriteComment postID={postID} colors={colors} theme={theme} />

      {comments.map((c: CommentViewDto) => (
        <CommentCard comment={c} />
      ))}
    </div>
  );
};

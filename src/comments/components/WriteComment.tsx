import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { AppColors, setError, showFastSignUp } from "../../lib/slices/appSlice";
import { FontSVG } from "../../lib/svgs/FontSVG";
import { RootState } from "../../store";
import { addNewComment } from "../slices/commentsSlice";
import { CommentEditor } from "./CommentEditor";

export const WriteComment = ({
  postID,
  colors,
  theme,
}: {
  postID: string;
  colors: AppColors;
  theme: string;
}) => {
  const [commentValue, setCommentValue] = useState("");
  const { me } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  async function createComment() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
      try {
        const { data } = await sendRequest(
          `comments/post/${postID}`,
          "post",
          true,
          {
            content: commentValue,
          }
        );

        data.author = me;

        dispatch(addNewComment(data));

        setCommentValue("");

        setTimeout(() => {
          document
            .getElementById(data.id)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      } catch (error: any) {
        dispatch(setError(error.message));
      }
    }
  }

  return (
    <div className="mt-12 w-full">
      <div>
        <div className="flex justify-between w-full">
          <div className="mb-4 flex items-center">
            <FontSVG />

            <div
              className={`ml-2 rounded-md font-semibold ${
                theme === "dark"
                  ? "text-" + colors.zinc50
                  : "text-" + colors.zinc900
              }`}
            >
              Write your comment
            </div>
          </div>
        </div>
        <CommentEditor
          content={commentValue}
          getEditorContent={(content) => setCommentValue(content)}
        />
        <div className="flex justify-start mt-2">
          <button
            className={`text-sm font-semibold absolute  w-fit py-2 rounded px-3 bg-zinc-900 text-white`}
            onClick={createComment}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

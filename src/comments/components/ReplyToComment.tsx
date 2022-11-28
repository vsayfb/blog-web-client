import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BlurArea } from "../../lib/components/BlurArea";
import { detectImage } from "../../lib/detectImage";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { ArrowBarLeftSVG } from "../../lib/svgs/ArrowBarLeftSVG";
import { FontSVG } from "../../lib/svgs/FontSVG";
import { CommentViewDto } from "../types/comment-view.dto";
import { CommentEditor } from "./CommentEditor";

export const ReplyToComment = ({
  comment,
  setReplyEditorVisibility,
}: {
  comment: CommentViewDto;
  setReplyEditorVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [replyValue, setReplyValue] = useState("");

  const dispatch = useDispatch();

  async function reply() {
    try {
      await sendRequest("comments/reply/" + comment.id, "post", true, {
        content: replyValue,
      });

      setReplyValue("");

      setReplyEditorVisibility(false);
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
    }
  }

  return (
    <>
      <div className={``}>
        <div className="mt-6">
          <div className="mb-4 flex items-center">
            <div
              className={`ml-2 rounded-md font-semibold text-zinc-900 w-full flex justify-between `}
            >
              <div>reply to @{comment.author.display_name}</div>
              <div
                className="cursor-pointer"
                onClick={() => setReplyEditorVisibility(false)}
              >
                <ArrowBarLeftSVG />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <CommentEditor
              getEditorContent={(content) => setReplyValue(content)}
              content={replyValue}
            />
          </div>

          <div className="flex justify-start mt-2">
            <button
              className={`text-sm font-semibold absolute  w-fit py-2 rounded px-3 bg-zinc-900 text-white`}
              onClick={reply}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { addNewComment } from "../slices/commentsSlice";

export const WriteComment = ({ postID }: { postID: string }) => {
  const [commentValue, setCommentValue] = useState("");
  const { me } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  async function createComment() {
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
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  }

  return (
    <div className="mt-12 w-full">
      <div>
        <div className="flex justify-between w-full">
          <div className="mb-4">
            <span className="rounded-md font-semibold cursor-pointer p-2 text-orange-200">
              Write
            </span>
            <span className="bg-transparent font-semibold text-[#7E8490] cursor-pointer p-2">
              Preview
            </span>
          </div>
          <div className="flex gap-3 text-[#9CA3AF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        </div>
        <textarea
          placeholder="Add your comment..."
          className="p-2 focus:outline-orange-200 font-bold border resize-none w-full border-zinc-900 rounded-md"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        ></textarea>
        <div className="flex justify-start">
          <button
            className="text-sm font-semibold absolute  w-fit bg-orange-200 text-zinc-900 py-2 rounded px-3"
            onClick={createComment}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

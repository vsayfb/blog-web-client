import { Link } from "react-router-dom";
import { detectImage } from "../../lib/detectImage";
import { AppColors } from "../../lib/slices/appSlice";
import { CommentViewDto } from "../types/comment-view.dto";
import { RemoveComment } from "./DeleteComment";

export const CommentCard = ({
  comment,
  colors,
  theme,
}: {
  comment: CommentViewDto;
  colors: AppColors;
  theme: string;
}) => {
  return (
    <div className="space-y-4 mt-20" id={comment.id}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className={`mt-2 rounded-full border-2 ${
              theme === "dark"
                ? "border-" + colors.zinc50
                : "border-" + colors.zinc900
            }`}
            width={60}
            alt="profile_img"
            src={detectImage(comment.author.image)}
          />

          <div className="flex items-center justify-evenly pt-2 pb-2">
            Like Dislike
          </div>
        </div>
        <div
          className={`flex-1 border-2 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed ${
            theme === "dark"
              ? "border-" + colors.zinc50
              : "border-" + colors.zinc900
          }`}
        >
          <Link to={`/profile/${comment.author.username}`}>
            <strong
              className={`${
                theme === "dark"
                  ? "border-" + colors.zinc50
                  : "border-" + colors.zinc900
              }`}
            >
              {comment.author.display_name}
            </strong>
          </Link>
          <span className="text-xs text-gray-400 ml-2 mr-2">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
          <RemoveComment commentID={comment.id} />

          <div
            className="light-content-tiny pt-2 pb-2"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          ></div>

          <div className="mt-4 flex items-center">
            <div className="flex -space-x-2 mr-2">
              <img
                className="rounded-full w-6 h-6 border border-white"
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                alt=""
              />
              <img
                className="rounded-full w-6 h-6 border border-white"
                src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                alt=""
              />
            </div>
            <div className="text-sm text-gray-500 font-semibold">5 Replies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

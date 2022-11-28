import { Link } from "react-router-dom";
import { detectImage } from "../../lib/detectImage";
import { CommentViewDto } from "../types/comment-view.dto";

export const CommentAuthor = ({
  author,
}: {
  author: CommentViewDto["author"];
}) => {
  return (
    <>
      <div className="flex justify-center">
        <img
          className={`mt-2`}
          style={{ borderRadius: "50%", height: "68px", width: "68px" }}
          alt="profile_img"
          src={detectImage(author.image)}
        />
      </div>

      <div className="mt-2 text-center">
        <Link className="font-bold  " to={`/profile/${author.username}`}>
          {author.display_name}
        </Link>
      </div>
    </>
  );
};

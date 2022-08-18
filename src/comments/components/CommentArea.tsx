import { CommentCard } from "./CommentCard";
import { WriteComment } from "./WriteComment";

export const CommentArea = () => {
  return (
    <div>
      <WriteComment />

      <h3 className="mb-4 mt-12 text-lg font-semibold text-gray-900">
        Comments
      </h3>

      <CommentCard />
      <CommentCard />
    </div>
  );
};

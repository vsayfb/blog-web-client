import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlurArea } from "../../lib/components/BlurArea";
import { sendRequest } from "../../lib/sendRequest";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { RootState } from "../../store";
import {
  getPreviousComment,
  setRepliesToCommentTree,
} from "../slices/commentsSlice";
import { CommentTreeCard } from "./CommentTreeCard";

export const CommentReplies = () => {
  const dispatch = useDispatch();

  const { commentTree } = useSelector((state: RootState) => state.comments);

  async function getReplies(commentID: string) {
    const result = await sendRequest(
      "comments/reply/" + commentID,
      "get",
      true
    );

    return result.data;
  }

  useEffect(() => {
    if (commentTree?.baseComment?.id) {
      getReplies(commentTree.baseComment.id).then((r) => {
        dispatch(setRepliesToCommentTree(r));
      });
    }
  }, [commentTree.baseComment?.id]);

  function showPreviousComment() {
    dispatch(getPreviousComment());
  }

  if (commentTree?.baseComment) {
    return (
      <BlurArea>
        <>
          <div
            className="ml-6 cursor-pointer"
            style={{ height: "28px" }}
            onClick={showPreviousComment}
          >
            <BackSVG w={30} />
          </div>

          <div className="w-full ">
            <div className="border-b border-emerald-500">
              <CommentTreeCard
                key={commentTree.baseComment.id}
                comment={commentTree.baseComment}
                openCommentReplies={false}
              />
            </div>

            {commentTree.commentReplies.length ? (
              commentTree.commentReplies?.map((r) => (
                <CommentTreeCard key={r.id} comment={r} />
              ))
            ) : (
              <h3 className="mt-12">There are no replies to this comment.</h3>
            )}
          </div>
        </>
      </BlurArea>
    );
  } else return null;
};

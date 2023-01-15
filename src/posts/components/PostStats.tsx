import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError, showFastSignUp } from "../../lib/slices/appSlice";
import { BookmarkFillSVG } from "../../lib/svgs/BookmarkFillSVG";
import { BookmarkSVG } from "../../lib/svgs/BookmarkSVG";
import { DislikeFillSVG } from "../../lib/svgs/DislikeFillSVG";
import { DislikeSVG } from "../../lib/svgs/DislikeSVG";
import { LikeFillSVG } from "../../lib/svgs/LikeFillSVG";
import { LikeSVG } from "../../lib/svgs/LikeSVG";
import { RootState } from "../../store";

export type PostStatsType = {
  like_count: number;
  bookmark_count: number;
  dislike_count: number;
  liked_by: boolean;
  disliked_by: boolean;
  bookmarked_by: boolean;
};

export const PostStats = ({
  postID,
  postAuthorID,
  stats,
}: {
  postID: string;
  postAuthorID: string;
  stats: PostStatsType;
}) => {
  const {
    bookmark_count,
    like_count,
    dislike_count,
    bookmarked_by,
    liked_by,
    disliked_by,
  } = stats;

  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  const [liked, setLiked] = useState(liked_by);
  const [disliked, setDisliked] = useState(disliked_by);
  const [bookmarked, setBookmarked] = useState(bookmarked_by);

  const [likeCount, setLikeCount] = useState(like_count);
  const [dislikeCount, setDislikeCount] = useState(dislike_count);
  const [bookmarkCount, setBookmarkCount] = useState(bookmark_count);

  async function dislikeExpression() {
    await sendRequest(`expressions/dislike/post/${postID}`, "post", true);
  }

  async function likeExpression() {
    await sendRequest(`expressions/like/post/${postID}`, "post", true);
  }

  async function likePost() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
      if (liked) {
        await removeExpression();
        setLikeCount((p) => --p);
        setLiked(false);
      } else if (disliked) {
        await removeExpression();
        setDislikeCount((p) => --p);
        setDisliked(false);

        await likeExpression();
        setLikeCount((p) => ++p);
        setLiked(true);
      } else {
        await likeExpression();
        setLikeCount((p) => ++p);
        setLiked(true);
      }
    }
  }

  async function dislikePost() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
      if (disliked) {
        await removeExpression();
        setDislikeCount((p) => --p);
        setDisliked(false);
      } else if (liked) {
        await removeExpression();
        setLikeCount((p) => --p);
        setLiked(false);

        await dislikeExpression();
        setDislikeCount((p) => ++p);
        setDisliked(true);
      } else {
        await dislikeExpression();
        setDislikeCount((p) => ++p);
        setDisliked(true);
      }
    }
  }

  async function removeExpression() {
    try {
      await sendRequest(`expressions/post/${postID}`, "delete", true);
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
    }
  }

  async function saveBookmark() {
    if (!me.username) {
      dispatch(showFastSignUp());
    } else {
      try {
        await sendRequest(`bookmarks/${postID}`, "post", true);

        setBookmarked(true);

        setBookmarkCount((p) => ++p);
      } catch (error: any) {
        dispatch(setError(error.response.data.message));
      }
    }
  }

  async function removeBookmark() {
    try {
      await sendRequest(`bookmarks/post/${postID}`, "delete", true);

      setBookmarked(false);

      setBookmarkCount((p) => --p);
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
    }
  }

  return (
    <>
      <div className="flex">
        <div className="flex">
          <div
            className="cursor-pointer"
            onClick={() => {
              if (bookmarked) removeBookmark();
              else saveBookmark();
            }}
          >
            {bookmarked ? <BookmarkFillSVG /> : <BookmarkSVG />}
          </div>
          <b className=" ml-1 text-black">{bookmarkCount}</b>
        </div>
        <div className="flex ml-4">
          {me.sub === postAuthorID ? (
            <div>
              <LikeSVG />
            </div>
          ) : (
            <div className="cursor-pointer" onClick={likePost}>
              {liked ? <LikeFillSVG /> : <LikeSVG />}
            </div>
          )}

          <b className=" ml-1 text-black">{likeCount}</b>
        </div>{" "}
        <div className="flex ml-4 ">
          {me.sub === postAuthorID ? (
            <div>
              <DislikeSVG />
            </div>
          ) : (
            <div className="cursor-pointer" onClick={dislikePost}>
              {disliked ? <DislikeFillSVG /> : <DislikeSVG />}
            </div>
          )}
          <b className=" ml-1 text-black">{dislikeCount}</b>
        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { BookmarkFillSVG } from "../../lib/svgs/BookmarkFillSVG";
import { BookmarkSVG } from "../../lib/svgs/BookmarkSVG";
import { DislikeFillSVG } from "../../lib/svgs/DislikeFillSVG";
import { DislikeSVG } from "../../lib/svgs/DislikeSVG";
import { LikeFillSVG } from "../../lib/svgs/LikeFillSVG";
import { LikeSVG } from "../../lib/svgs/LikeSVG";

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
  stats,
}: {
  postID: string;
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

  const [liked, setLiked] = useState(liked_by);
  const [disliked, setDisliked] = useState(disliked_by);
  const [bookmarked, setBookmarked] = useState(bookmarked_by);

  const [likeCount, setLikeCount] = useState(like_count);
  const [dislikeCount, setDislikeCount] = useState(dislike_count);
  const [bookmarkCount, setBookmarkCount] = useState(bookmark_count);

  async function likePost() {
    if (!liked) {
      try {
        await sendRequest(`expressions/like/post/${postID}`, "post", true);

        setLiked(true);
        setDisliked(false);
        setLikeCount((pr) => ++pr);
      } catch (error: any) {
        dispatch(setError(error.response.data.message));
      }
    } else {
      await removeExpression();
      setLiked(false);
      setLikeCount((pr) => --pr);
    }
  }

  async function dislikePost() {
    if (!disliked) {
      try {
        await sendRequest(`expressions/dislike/post/${postID}`, "post", true);

        setDisliked(true);
        setLiked(false);
        setDislikeCount((pr) => ++pr);
      } catch (error: any) {
        dispatch(setError(error.response.data.message));
      }
    } else {
      await removeExpression();
      setDisliked(false);
      setDislikeCount((pr) => --pr);
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
    try {
      await sendRequest(`bookmarks/${postID}`, "post", true);

      setBookmarked(true);

      setBookmarkCount((p) => ++p);
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
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
          <b className=" ml-1">{bookmarkCount}</b>
        </div>
        <div className="flex ml-4">
          <div className="cursor-pointer" onClick={likePost}>
            {liked ? <LikeFillSVG /> : <LikeSVG />}
          </div>
          <b className=" ml-1">{likeCount}</b>
        </div>{" "}
        <div className="flex ml-4 ">
          <div className="cursor-pointer" onClick={dislikePost}>
            {disliked ? <DislikeFillSVG /> : <DislikeSVG />}
          </div>
          <b className=" ml-1">{dislikeCount}</b>
        </div>
      </div>
    </>
  );
};

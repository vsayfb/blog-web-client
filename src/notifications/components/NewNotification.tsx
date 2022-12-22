import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  NotificationT,
  resetNewNotification,
} from "../slices/notificationSlice";
import { CommentNotification } from "./CommentNotification";
import { FollowedYouNotification } from "./FollowedYouNotification";
import { PostExpressionNotification } from "./PostExpressionNotification";
import { ReplyNotification } from "./RepliedNotification";

export const NewNotification = ({
  newNotification,
}: {
  newNotification: NotificationT;
}) => {
  const dispatch = useDispatch();

  function handleNotification() {
    switch (newNotification.action) {
      // case "followed you":
      //   return <FollowedYouNotification notification={newNotification} />;

      // case "commented on your post":
      //   return <CommentNotification notification={newNotification} />;

      // case "replied your comment":
      //   return <ReplyNotification notification={newNotification} />;

      default:
        return (
          <PostExpressionNotification
            notification={newNotification}
            key={newNotification.id}
          />
        );
    }
  }

  return (
    <div
      style={{ position: "fixed", right: "10px", bottom: "24px" }}
      className=" flex rounded-lg p-4 mb-4"
      role="alert"
    >
      <div>
        <svg
          className="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div onClick={() => dispatch(resetNewNotification())}>
        {handleNotification()}
      </div>
    </div>
  );
};

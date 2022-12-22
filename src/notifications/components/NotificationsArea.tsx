import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../lib/sendRequest";

import { RootState } from "../../store";
import { NotificationT, setNotifications } from "../slices/notificationSlice";
import { CommentExpressionNotification } from "./CommentExpressionNotification";
import { CommentNotification } from "./CommentNotification";
import { FollowedYouNotification } from "./FollowedYouNotification";
import { PostExpressionNotification } from "./PostExpressionNotification";
import { ReplyNotification } from "./RepliedNotification";

export const NotificationsArea = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  const dispatch = useDispatch();

  async function getNotifications(): Promise<{
    data: NotificationT[];
    message: string;
  }> {
    return await sendRequest("notifications/me", "get", true);
  }

  useEffect(() => {
    getNotifications().then((n) => {
      dispatch(setNotifications(n.data));
    });
  }, []);

  if (!notifications.length)
    return (
      <div>
        <div
          className=" absolute z-20   top-16 rounded-md"
          style={{ right: "11%" }}
        >
          <h4>There are no notifications to show.</h4>
        </div>
      </div>
    );

  return (
    <div className="relative">
      {true ? (
        <div
          className=" absolute z-20 rounded-md  top-16"
          style={{ right: "11%" }}
        >
          <div
            className="   shadow-lg overflow-hidden z-20"
            style={{ width: "24rem" }}
          >
            {
              notifications.length ? (
                notifications.map((noti) => {
                  if (noti.action === "followed you") {
                    return (
                      <FollowedYouNotification
                        notification={noti}
                        key={noti.id}
                      />
                    );
                  } else if (noti.action === "commented on your post") {
                    return (
                      <CommentNotification notification={noti} key={noti.id} />
                    );
                  } else if (noti.action === "liked your post") {
                    return (
                      <PostExpressionNotification
                        notification={noti}
                        key={noti.id}
                      />
                    );
                  } else if (noti.action === "disliked your post") {
                    return (
                      <PostExpressionNotification
                        notification={noti}
                        key={noti.id}
                      />
                    );
                  } else if (noti.action === "liked your comment") {
                    return (
                      <CommentExpressionNotification
                        notification={noti}
                        key={noti.id}
                      />
                    );
                  } else if (noti.action === "disliked your comment") {
                    return (
                      <CommentExpressionNotification
                        notification={noti}
                        key={noti.id}
                      />
                    );
                  } else if (noti.action === "replied your comment") {
                    return (
                      <ReplyNotification notification={noti} key={noti.id} />
                    );
                  } else return null;
                })
              ) : (
                <>
                  <div className="p-6 flex justify-center items-center ">
                    There are no notifications to show.
                  </div>
                </>
              )
              /* <a className="block bg-gray-800 text-white text-center font-bold py-2">
          See all notifications
        </a> */
            }
          </div>
        </div>
      ) : null}
    </div>
  );
};

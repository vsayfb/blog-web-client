import moment from "moment";
import { Link } from "react-router-dom";
import { detectImage } from "../../lib/detectImage";
import { NotificationT } from "../slices/notificationSlice";

export const FollowedYouNotification = ({
  notification,
}: {
  notification: NotificationT;
}) => {
  return (
    <div key={notification.id} className="py-2 border-b border-black ">
      <div className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
        <img
          className="h-8 w-8 rounded-full object-cover mx-1"
          src={detectImage(notification.sender.image)}
          alt="avatar"
        />
        <p className="text-gray-600 text-sm mx-2">
          <Link
            className="font-bold"
            to={`/profile/${notification.sender.username}`}
          >
            {notification.sender.display_name}
          </Link>
          <span className="ml-2 text-emerald-500 underline ">
            {notification.action}
          </span>
        </p>

        <small className="text-zinc-900">
          {moment(notification.createdAt).fromNow()}
        </small>
      </div>
    </div>
  );
};

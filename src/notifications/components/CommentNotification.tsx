import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { detectImage } from "../../lib/detectImage";
import moment from "moment";
import { NotificationT } from "../slices/notificationSlice";

export type CommentNotification = NotificationT & {
  post: {
    id: string;
    title: string;
    title_image: string | null;
    url: string;
    content: string;
    published: true;
    created_at: string;
    updated_at: string;
  };
  comment: {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
  };
};

export const CommentNotification = ({
  notification,
}: {
  notification: any;
}) => {
  const noti: CommentNotification = notification;

  return (
    <div key={noti.id} className="py-2 border-b border-black ">
      <div className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
        <img
          className="h-8 w-8 rounded-full object-cover mx-1"
          src={detectImage(noti.sender.image)}
          alt="avatar"
        />
        <p className="text-gray-600 text-sm mx-2">
          <Link className="font-bold" to={`/profile/${noti.sender.username}`}>
            {noti.sender.display_name}
          </Link>
          <HashLink
            smooth={true}
            elementId={`${noti.comment.id}`}
            to={`${noti.post.url}`}
            className="ml-2 text-emerald-500 underline "
          >
            {noti.action}
          </HashLink>
        </p>

        <small className="text-zinc-900">
          {moment(noti.createdAt).fromNow()}
        </small>
      </div>
    </div>
  );
};

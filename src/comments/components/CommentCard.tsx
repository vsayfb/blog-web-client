import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";

export const CommentCard = () => {
  const { me } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-4 mt-12">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-2 rounded-full border-2 border-orange-200"
            width={60}
            alt="profile_img"
            src={me.image}
          />

          <div className="flex items-center justify-evenly pt-2 pb-2">
            Like Dislike
          </div>
        </div>
        <div className="flex-1 border-2 border-orange-200 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <Link to={`/profile/${me.username}`}>
            <strong className="text-orange-200">{me.display_name}</strong>
          </Link>
          <span className="text-xs text-gray-400 ml-2 mr-2">
            {new Date().toLocaleDateString()}
          </span>
          <b className=" text-red-500 cursor-pointer">Remove Comment</b>
          <div className="light-content-tiny pt-2 pb-2">Content here...</div>
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

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Me } from "../../../auth/slices/authSlice";
import { DashboardSVG } from "../../../lib/svgs/DashboardSVG";
import { InboxSVG } from "../../../lib/svgs/InboxSVG";
import { NotitificationSVG } from "../../../lib/svgs/NotificationSVG";
import { toggleNotificationAreaVisibility } from "../../../notifications/slices/notificationSlice";
import { UserMenuArea } from "./UserMenuArea";

export const NavbarRight = ({ me, pending }: { me: Me; pending: boolean }) => {
  const dispatch = useDispatch();

  const openNotificationArea = () => {
    dispatch(toggleNotificationAreaVisibility());
  };

  if (pending)
    return (
      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin "></div>
    );

  if (!me.username)
    return (
      <div className="flex items-center">
        <Link
          to={"/signIn"}
          className={`self-center px-6 py-2 font-semibold rounded mr-4 bg-zinc-900 text-white`}
        >
          Sign in
        </Link>
        <Link
          to={"/signUp"}
          className={`self-center px-6 py-2 font-semibold rounded mr-4 bg-zinc-900 text-white`}
        >
          Sign up
        </Link>
      </div>
    );

  return (
    <div className="md:block ">
      <div className="ml-4 flex items-center  md:ml-6">
        <Link to={"/dashboard"} className="mr-4 cursor-pointer">
          <DashboardSVG fill={"#000000"} />
        </Link>

        <div className="cursor-pointer" onClick={openNotificationArea}>
          <NotitificationSVG fill={"#000000"} />
        </div>

        <div className="cursor-pointer">
          <InboxSVG fill={"#000000"} />
        </div>

        <div>
          <UserMenuArea me={me} />
        </div>
      </div>
    </div>
  );
};

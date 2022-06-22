import { Link } from "react-router-dom";
import { Me } from "../../../lib/slices/authSlice";
import { DashboardSVG } from "../../../lib/svgs/DashboardSVG";
import { NotitificationSVG } from "../../../lib/svgs/NotificationSVG";
import { UserMenuArea } from "./UserMenuArea";

export const NavbarRight = ({ me, pending }: { me: Me; pending: boolean }) => {
  if (pending)
    return (
      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin "></div>
    );

  if (!me.username)
    return (
      <div className="flex items-center">
        <Link
          to={"/signIn"}
          className="self-center px-6 py-2 font-semibold rounded bg-orange-200  text-orange-800 mr-4"
        >
          Sign in
        </Link>
        <Link
          to={"/signUp"}
          className="self-center px-6 py-2 font-semibold rounded bg-orange-200 text-orange-800"
        >
          Sign up
        </Link>
      </div>
    );

  return (
    <div className="md:block ">
      <div className="ml-4 flex items-center  md:ml-6">
        <Link to={"/dashboard"} className="mr-4 cursor-pointer">
          <DashboardSVG />
        </Link>

        <div className="cursor-pointer">
          <NotitificationSVG />
        </div>

        <div>
          <UserMenuArea me={me} />
        </div>
      </div>
    </div>
  );
};

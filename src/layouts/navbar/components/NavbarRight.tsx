import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Me } from "../../../auth/slices/authSlice";
import { AppColors } from "../../../lib/slices/appSlice";
import { DashboardSVG } from "../../../lib/svgs/DashboardSVG";
import { InboxSVG } from "../../../lib/svgs/InboxSVG";
import { NotitificationSVG } from "../../../lib/svgs/NotificationSVG";
import { RootState } from "../../../store";
import { UserMenuArea } from "./UserMenuArea";

export const NavbarRight = ({
  me,
  pending,
  theme,
  colors,
}: {
  me: Me;
  pending: boolean;
  theme: string;
  colors: AppColors;
}) => {
  if (pending)
    return (
      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin "></div>
    );

  if (!me.username)
    return (
      <div className="flex items-center">
        <Link
          to={"/signIn"}
          className={`self-center px-6 py-2 font-semibold rounded mr-4 ${
            theme === "dark"
              ? "bg-orange-200 text-orange-800"
              : "bg-blue-600 text-white"
          } `}
        >
          Sign in
        </Link>
        <Link
          to={"/signUp"}
          className={`self-center px-6 py-2 font-semibold rounded ${
            theme === "dark"
              ? "bg-orange-200 text-orange-800"
              : "bg-blue-600 text-white"
          } `}
        >
          Sign up
        </Link>
      </div>
    );

  return (
    <div className="md:block ">
      <div className="ml-4 flex items-center  md:ml-6">
        <Link to={"/dashboard"} className="mr-4 cursor-pointer">
          <DashboardSVG fill={theme === "dark" ? "#fed7aa" : "#2563eb"} />
        </Link>

        <div className="cursor-pointer">
          <NotitificationSVG fill={theme === "dark" ? "#fed7aa" : "#2563eb"} />
        </div>

        <div className="cursor-pointer">
          <InboxSVG fill={theme === "dark" ? "#fed7aa" : "#2563eb"} />
        </div>

        <div>
          <UserMenuArea me={me} />
        </div>
      </div>
    </div>
  );
};

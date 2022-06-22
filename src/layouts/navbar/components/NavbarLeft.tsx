import { Link } from "react-router-dom";
import { AppLogo } from "../../../lib/components/AppLogo";
import { Me } from "../../../lib/slices/authSlice";

export const NavbarLeft = ({ me, pending }: { me: Me; pending: boolean }) => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0">
        <AppLogo />
      </Link>
      {pending ? (
        <div className="ml-12 w-6 h-6 border-4 border-dashed rounded-full animate-spin "></div>
      ) : me?.username ? (
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link
              to="write"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Write
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

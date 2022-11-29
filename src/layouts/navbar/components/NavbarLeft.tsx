import { Link } from "react-router-dom";
import { AppLogo } from "../../../lib/components/AppLogo";
import { Me } from "../../../auth/slices/authSlice";
import { TagSVG } from "../../../tags/svgs/TagSVG";

export const NavbarLeft = ({ me, pending }: { me: Me; pending: boolean }) => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0">
        <AppLogo />
      </Link>

      <Link className="flex justify-center items-center ml-7" to={"/tags"}>
        <TagSVG />
        <span className="text-sm text-black ml-1">Tags</span>
      </Link>

      {pending ? (
        <div className="ml-12 w-6 h-6 border-4 border-dashed rounded-full animate-spin "></div>
      ) : me?.username ? (
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link
              to="write"
              className={`  px-3 py-2 rounded text-sm font-medium bg-zinc-900 text-white`}
            >
              Write
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

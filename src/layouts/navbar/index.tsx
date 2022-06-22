import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { NavbarLeft } from "./components/NavbarLeft";
import { NavbarRight } from "./components/NavbarRight";

export function Navbar() {
  const { me, pending } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="min-h-full bg-zinc-900 border-b-2 border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavbarLeft me={me} pending={pending} />
          <NavbarRight me={me} pending={pending} />
        </div>
      </div>
    </nav>
  );
}

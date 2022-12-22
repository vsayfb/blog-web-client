import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { NavbarLeft } from "./components/NavbarLeft";
import { NavbarRight } from "./components/NavbarRight";

export function Navbar({}: {}) {
  const { me, pending } = useSelector((state: RootState) => state.auth);

  return (
    <nav className={`border-b-2 border-amber-500 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavbarLeft me={me} pending={pending} />
          <NavbarRight me={me} pending={pending} />
        </div>
      </div>
    </nav>
  );
}

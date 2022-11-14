import { useSelector } from "react-redux";
import { AppColors } from "../../lib/slices/appSlice";
import { RootState } from "../../store";
import { NavbarLeft } from "./components/NavbarLeft";
import { NavbarRight } from "./components/NavbarRight";

export function Navbar({
  theme,
  colors,
}: {
  theme: string;
  colors: AppColors;
}) {
  const { me, pending } = useSelector((state: RootState) => state.auth);

  return (
    <nav
      className={`bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 min-h-full ${
        theme === "dark"
          ? `bg-${colors.zinc900} border-${colors.orange200}`
          : `bg-${colors.zinc50} border-${colors.blue400}`
      } border-b-2 `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavbarLeft me={me} pending={pending} colors={colors} theme={theme} />
          <NavbarRight
            me={me}
            pending={pending}
            colors={colors}
            theme={theme}
          />
        </div>
      </div>
    </nav>
  );
}

import { AppLogo } from "../../lib/components/AppLogo";

type Props = {
  children: JSX.Element;
};

export default function Auth({ children }: Props) {
  return (
    <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <AppLogo w="80" h="80" />
        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
          {children}
        </div>
      </div>
    </div>
  );
}

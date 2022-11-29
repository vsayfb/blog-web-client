import { ReactNode } from "react";

export const ProfileArea = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-8xl px-3 py-12 mx-auto h-full">
      <div className="grid gap-4 sm:mx-0 lg:mx-4 lg:grid-cols-12">
        {children}
      </div>
    </div>
  );
};

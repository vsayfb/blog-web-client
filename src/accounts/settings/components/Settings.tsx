import { SettingsLeft } from "./SettingsLeft";
import { SettingsRight } from "./SettingsRight";

export const Settings = () => {
  return (
    <div className="max-w-8xl px-3 py-12 mx-auto h-screen  ">
      <div className="grid gap-4 sm:mx-0 lg:mx-4 lg:grid-cols-12">
        <SettingsLeft />
        <SettingsRight />
      </div>
    </div>
  );
};

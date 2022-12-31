import { SetStateAction, useEffect } from "react";

export const GoogleAccountTfaOptions = ({
  enableWithMobilePhone,
  setEnableVia,
}: {
  enableWithMobilePhone: boolean;
  setEnableVia: React.Dispatch<SetStateAction<"email" | "mobile_phone">>;
}) => {
  useEffect(() => {
    if (enableWithMobilePhone) setEnableVia("mobile_phone");
  }, []);

  if (!enableWithMobilePhone) return null;

  return (
    <>
      <label
        htmlFor="tfa_options"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Send verification code to my
      </label>
      <select
        id="tfa_options"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={"mobile_phone"} selected>
          Mobile Phone
        </option>
      </select>
    </>
  );
};

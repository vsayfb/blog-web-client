export const GoogleAccountTfaOptions = ({}: {}) => {
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
        <option defaultValue={"mobile_phone"} selected>
          Mobile Phone
        </option>
        <option value="mobile_phone">Mobile phone</option>
      </select>
    </>
  );
};

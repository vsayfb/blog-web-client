import { HTMLInputTypeAttribute } from "react";

export const InputField = ({
  type = "text",
  labelText,
  labelAttributes,
  value,
  onChangeEvent,
  inputAttributes,
}: {
  type?: HTMLInputTypeAttribute;
  labelText: string;
  value: string;
  onChangeEvent: React.ChangeEventHandler<HTMLInputElement>;
  labelAttributes?: string;
  inputAttributes?: string;
}) => {
  const INPUT_CLASS =
    "border-b  text-xs font-medium outline-none leading-none text-gray-800 py-3 w-full pl-3 mt-2";

  return (
    <>
      <label
        className={`text-sm font-medium leading-none text-gray-800 ${labelAttributes}`}
      >
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChangeEvent}
        className={`${INPUT_CLASS} ${inputAttributes}`}
      />
    </>
  );
};

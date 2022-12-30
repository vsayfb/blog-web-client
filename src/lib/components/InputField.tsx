import { HTMLInputTypeAttribute } from "react";

export const InputField = ({
  type = "text",
  value,
  onChangeEvent,
  labelText,
  labelAttributes,
  inputAttributes,
  placeholderText,
}: {
  type?: HTMLInputTypeAttribute;
  value: string;
  onChangeEvent: React.ChangeEventHandler<HTMLInputElement>;
  labelText?: string;
  labelAttributes?: string;
  inputAttributes?: string;
  placeholderText?: string;
}) => {
  const INPUT_CLASS =
    "placeholder-zinc-900 border-b border-zinc-900  text-xs font-medium outline-none leading-none py-3 w-full pl-3 mt-2";

  return (
    <>
      <label className={`text-md font-medium leading-none ${labelAttributes}`}>
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChangeEvent}
        className={`${INPUT_CLASS} ${inputAttributes}`}
        placeholder={placeholderText || ""}
      />
    </>
  );
};

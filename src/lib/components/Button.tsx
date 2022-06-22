export const MyButton = ({
  onClickEvent,
  buttonText,
  classProperties = "",
  role = "button",
}: {
  onClickEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
  classProperties?: string;
  role?: React.AriaRole | undefined;
}) => {
  const BUTTON_CLASS =
    "focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full";

  return (
    <button
      onClick={onClickEvent}
      role={role}
      className={`${BUTTON_CLASS} ${classProperties}`}
    >
      {buttonText}
    </button>
  );
};

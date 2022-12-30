import Spinner from "./Spinner";

export const MyButton = ({
  onClickEvent,
  buttonText,
  classProperties = "",
  role = "button",
  disabled,
  showSpinnerWhenDisabled = true,
}: {
  onClickEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
  classProperties?: string;
  role?: React.AriaRole | undefined;
  disabled?: boolean;
  showSpinnerWhenDisabled?: boolean;
}) => {
  const BUTTON_CLASS = `
    text-sm font-semibold focus:outline-none 
    bg-zinc-900 text-white rounded py-4 w-full flex justify-center items-center`;

  return (
    <button
      type="button"
      onClick={onClickEvent}
      role={role}
      className={
        disabled
          ? `${BUTTON_CLASS} ${classProperties} bg-zinc-400`
          : `${BUTTON_CLASS} ${classProperties} `
      }
      disabled={disabled}
    >
      {disabled && showSpinnerWhenDisabled ? (
        <Spinner w={22} h={22} />
      ) : (
        buttonText
      )}
    </button>
  );
};

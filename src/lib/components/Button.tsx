import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Spinner from "./Spinner";

export const MyButton = ({
  onClickEvent,
  buttonText,
  classProperties = "",
  role = "button",
  disabled,
}: {
  onClickEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
  classProperties?: string;
  role?: React.AriaRole | undefined;
  disabled?: boolean;
}) => {
  const { theme, colors } = useSelector((state: RootState) => state.app);

  const buttonBg = "bg-" + (theme === "dark" ? colors.zinc50 : colors.zinc900);

  const buttonTextColor =
    "text-" + (theme === "dark" ? colors.zinc900 : "white");

  const BUTTON_CLASS = `
    text-sm font-semibold focus:outline-none 
    ${buttonBg} ${buttonTextColor} rounded py-4 w-full flex justify-center items-center`;

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
      disabled={disabled ? true : false}
    >
      {disabled ? <Spinner w={22} h={22} /> : buttonText}
    </button>
  );
};

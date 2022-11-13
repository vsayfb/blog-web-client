import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
  const { theme, colors } = useSelector((state: RootState) => state.app);

  const buttonBg = "bg-" + (theme === "dark" ? colors.zinc50 : colors.zinc900);

  const buttonTextColor =
    "text-" + (theme === "dark" ? colors.zinc900 : "white");

  const BUTTON_CLASS = `
    text-sm font-semibold focus:outline-none 
    ${buttonBg} ${buttonTextColor} rounded py-4 w-full`;

  return (
    <button
      onClick={onClickEvent}
      role={role}
      className={`${BUTTON_CLASS} ${classProperties} `}
    >
      {buttonText}
    </button>
  );
};

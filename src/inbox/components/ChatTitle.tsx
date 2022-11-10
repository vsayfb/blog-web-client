import { AppColors } from "../../lib/slices/appSlice";

export const ChatTitle = ({
  image,
  title,
  colors,
  theme,
}: {
  image: string;
  title: string;
  colors: AppColors;
  theme: string;
}) => {
  return (
    <div
      className={`flex items-center border-b pl-3 py-3 ${
        theme === "dark"
          ? "border-" + colors.orange200
          : "border-" + colors.blue400
      }`}
    >
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={image}
        alt="username"
      />
      <span
        className={`block ml-2 font-bold text-base ${
          theme === "dark"
            ? "text-" + colors.orange200
            : "text-" + colors.blue400
        } `}
      >
        {title}
      </span>
      <span className="connected text-green-500 ml-2">
        <svg width="6" height="6">
          <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
        </svg>
      </span>
    </div>
  );
};

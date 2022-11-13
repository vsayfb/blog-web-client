import { useSelector } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { detectImage } from "../../lib/detectImage";
import { RootState } from "../../store";

export const ChatMessage = ({
  position,
  content,
  created_at,
  sender,
}: {
  position: "right" | "left";
  content: string;
  created_at: string;
  sender?: AccountViewDto;
}) => {
  const { colors, theme } = useSelector((state: RootState) => state.app);

  if (position === "left" && sender) {
    return (
      <div className="w-full flex justify-start items-center">
        <span>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={detectImage(sender.image)}
            alt="username"
          />
        </span>

        <div
          className="ml-4 rounded py-1 my-2 relative"
          style={{ minWidth: "100px", maxWidth: "300px" }}
        >
          <div
            className={`${
              theme === "dark"
                ? "text-" + colors.zinc50
                : "text-" + colors.zinc900
            }`}
          >
            {content}
          </div>
          {/* <div className="text-xs px-2 text-right">{created_at}</div> */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-end">
      <div
        className={`"ml-4 ${
          theme === "dark" ? "bg-" + colors.orange200 : "bg-" + colors.blue400
        }  rounded py-1 my-2  relative"`}
        style={{ minWidth: "100px", maxWidth: "300px" }}
      >
        <div
          className={`text-left px-2 ${
            theme === "dark" ? "text-" + "black" : "text-" + "white"
          }`}
        >
          {content}
        </div>
        {/* <div className="text-xs px-2 text-right">{created_at}</div> */}
      </div>
    </div>
  );
};

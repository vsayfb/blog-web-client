import { AccountViewDto } from "../../accounts/types/account-view-dto";

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
  if (position === "left" && sender) {
    return (
      <div className="w-full flex justify-start items-center">
        <span>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={sender.image || ""}
            alt="username"
          />
        </span>

        <div
          className="ml-4 bg-gray-100 rounded py-1 my-2 text-gray-700 relative"
          style={{ minWidth: "100px", maxWidth: "300px" }}
        >
          <div className="text-left px-2">{content}</div>
          <div className="text-xs px-2 text-right">{created_at}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-end">
      <div
        className="ml-4 bg-orange-200 rounded py-1 my-2 text-zinc-900 relative"
        style={{ minWidth: "100px", maxWidth: "300px" }}
      >
        <div className="text-left px-2">{content}</div>
        <div className="text-xs px-2 text-right">{created_at}</div>
      </div>
    </div>
  );
};

export const ChatMessage = ({ position }: { position: "right" | "left" }) => {
  if (position === "left") {
    return (
      <div className="w-full flex justify-start items-center">
        <span>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://upload.wikimedia.org/wikipedia/tr/0/03/Walter_White_S5B.png"
            alt="username"
          />
        </span>

        <div
          className="ml-4 bg-gray-100 rounded py-1 my-2 text-gray-700 relative"
          style={{ minWidth: "100px", maxWidth: "300px" }}
        >
          <div className="text-left px-2">I am the danger!</div>
          <div className="text-xs px-2 text-right">10:30pm</div>
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
        <div className="text-left px-2">Hey yo. Mr White!</div>
        <div className="text-xs px-2 text-right">10:30pm</div>
      </div>
    </div>
  );
};

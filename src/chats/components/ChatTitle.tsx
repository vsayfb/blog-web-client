export const ChatTitle = () => {
  return (
    <div className="flex items-center border-b border-orange-200 pl-3 py-3">
      <img
        className="h-10 w-10 rounded-full object-cover"
        src="https://upload.wikimedia.org/wikipedia/tr/0/03/Walter_White_S5B.png"
        alt="username"
      />
      <span className="block ml-2 font-bold text-base text-orange-200">
        Walter White
      </span>
      <span className="connected text-green-500 ml-2">
        <svg width="6" height="6">
          <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
        </svg>
      </span>
    </div>
  );
};

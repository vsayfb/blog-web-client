export const ChatTitle = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  return (
    <div className={`flex items-center border-b pl-3 py-3 `}>
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={image}
        alt="username"
      />
      <span className={`block ml-2 font-bold text-base  `}>{title}</span>
      <span className="connected text-green-500 ml-2">
        <svg width="6" height="6">
          <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
        </svg>
      </span>
    </div>
  );
};

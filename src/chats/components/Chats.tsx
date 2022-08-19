export const Chats = () => {
  return (
    <ul className="overflow-auto">
      <h2 className="ml-2 mb-2 text-orange-200 text-lg my-2">Chats</h2>
      <li>
        <a className="hover:bg-orange-200 hover:text-black text-white border-b border-orange-200 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-orange-200 transition duration-150 ease-in-out">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://upload.wikimedia.org/wikipedia/tr/0/03/Walter_White_S5B.png"
            alt="username"
          />
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base  ">
                Walter White
              </span>
              <span className="block ml-2 text-sm ">5 minutes</span>
            </div>
            <span className="block ml-2 text-sm ">I am the danger!</span>
          </div>
        </a>
      </li>
    </ul>
  );
};

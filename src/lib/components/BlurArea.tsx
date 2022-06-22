export const BlurArea = ({ children }: { children: JSX.Element }) => {
  return (
    <div
      className={`absolute pt-12 left-0 top-0 flex justify-center align-middle items-center min-h-screen min-w-full overflow-y-auto`}
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      {children}
    </div>
  );
};

export const BlurArea = ({
  children,
  zindex,
}: {
  children: JSX.Element;
  zindex?: number;
}) => {
  return (
    <div
      className={`fixed left-0 top-0 bottom-0 flex justify-center align-middle pt-12 pb-12 h-screen w-screen overflow-y-auto`}
      style={{
        backdropFilter: "blur(10px)",
        zIndex: zindex || 1000,
      }}
    >
      {children}
    </div>
  );
};

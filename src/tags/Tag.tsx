export const Tag = ({ name, size }: { name: string; size?: string }) => {
  const TAG_CLASSNAME =
    "mr-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-full";

  return <div className={`${TAG_CLASSNAME} ${size}`}>{name}</div>;
};

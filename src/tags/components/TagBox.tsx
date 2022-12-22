import { Link } from "react-router-dom";

export const TagBox = ({ name, size }: { name: string; size?: string }) => {
  const TAG_CLASSNAME =
    "mr-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-amber-500 text-zinc-900 rounded-full";

  return (
    <Link to={`/tag/${name}`} className={`${TAG_CLASSNAME} ${size}`}>
      {name}
    </Link>
  );
};

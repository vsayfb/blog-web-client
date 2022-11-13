import { detectImage } from "../../lib/detectImage";

export const ProfileImage = ({ url }: { url: string | null }) => {
  return (
    <img
      src={detectImage(url)}
      alt="profile_image"
      width={175}
      height={150}
      className="mx-auto rounded-full aspect-square  border-emerald-500"
    />
  );
};

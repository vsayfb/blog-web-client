import { detectImage } from "../../lib/detectImage";

export const ProfileImage = ({ url }: { url: string | null }) => {
  return (
    <img
      src={detectImage(url)}
      alt="profile_image"
      className="w-32 h-32 mx-auto rounded-full aspect-square border-4 border-emerald-500"
    />
  );
};

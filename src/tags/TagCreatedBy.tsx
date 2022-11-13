import { Link } from "react-router-dom";
import { AccountViewDto } from "../accounts/types/account-view-dto";
import { detectImage } from "../lib/detectImage";

export const TagCreatedBy = ({
  account,
  imageWidth,
  imageHeight,
}: {
  account: AccountViewDto;
  imageWidth?: number;
  imageHeight?: number;
}) => (
  <div className="text-sm text-zinc-900">
    <Link
      to={`/profile/${account.username}`}
      className="flex justify-between items-center"
    >
      <span>created by </span>
      <span className="ml-2 flex justify-between items-center">
        <img
          className="rounded-full"
          src={detectImage(account.image)}
          width={imageWidth ? imageWidth : 16}
          height={imageHeight ? imageHeight : 16}
          alt="profile_img"
        />
        <span className="ml-2">{account.display_name}</span>
      </span>
    </Link>
  </div>
);

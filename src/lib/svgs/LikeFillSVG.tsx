import { AppHashColors } from "../../App";

export const LikeFillSVG = ({ w, h }: { w?: number; h?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-heart text-red-700"
    width={w || 24}
    height={h || 24}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill={AppHashColors.RED}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
  </svg>
);

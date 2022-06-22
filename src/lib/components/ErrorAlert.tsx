import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../slices/appSlice";
import { RootState } from "../../store";

export const ErrorAlert = () => {
  const { error } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    let timerID: NodeJS.Timeout;

    if (error.message) {
      timerID = setTimeout(() => {
        dispatch(resetError());
      }, 3000);
    }

    return () => clearTimeout(timerID);
  }, [error]);

  if (!error.message) return null;

  return (
    <div className="flex justify-center ">
      <div
        className="p-5 fixed bg-red-50 border-l-4 border-red-500 rounded-r-lg"
        style={{ top: "0px" }}
      >
        <div className="flex ">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 15C9.4 15 9 14.6 9 14C9 13.4 9.4 13 10 13C10.6 13 11 13.4 11 14C11 14.6 10.6 15 10 15ZM11 10C11 10.6 10.6 11 10 11C9.4 11 9 10.6 9 10V6C9 5.4 9.4 5 10 5C10.6 5 11 5.4 11 6V10Z"
              fill="#E85444"
            ></path>
          </svg>
          <h5 className="ml-4 text-red-800 font-medium">{error.message}</h5>
          <button
            className="ml-2 cursor-pointer"
            onClick={() => dispatch(resetError())}
          >
            <svg
              className="text-red-800"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.93341 6.00008L11.1334 1.80008C11.4001 1.53341 11.4001 1.13341 11.1334 0.866748C10.8667 0.600081 10.4667 0.600081 10.2001 0.866748L6.00008 5.06675L1.80008 0.866748C1.53341 0.600081 1.13341 0.600081 0.866748 0.866748C0.600082 1.13341 0.600082 1.53341 0.866748 1.80008L5.06675 6.00008L0.866748 10.2001C0.733415 10.3334 0.666748 10.4667 0.666748 10.6667C0.666748 11.0667 0.933415 11.3334 1.33341 11.3334C1.53341 11.3334 1.66675 11.2667 1.80008 11.1334L6.00008 6.93341L10.2001 11.1334C10.3334 11.2667 10.4667 11.3334 10.6667 11.3334C10.8667 11.3334 11.0001 11.2667 11.1334 11.1334C11.4001 10.8667 11.4001 10.4667 11.1334 10.2001L6.93341 6.00008Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../lib/slices/appSlice";
import { ImageSVG } from "../../lib/svgs/ImageSVG";

import { RootState } from "../../store";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { CreatePostDto } from "../../screens/WritePost";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export const TitleImage = ({
  setTitleImage,
}: {
  setTitleImage:
    | React.Dispatch<SetStateAction<any>>
    | ActionCreatorWithPayload<any>;
}) => {
  const { savedPost } = useSelector((state: RootState) => state.posts);

  const inputFile = useRef<any>(null);

  const [file, setFile] = useState<File | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files?.length) {
      setFile(files[0]);
    }
  }

  useEffect(() => {
    if (file) {
      setTitleImage(file);
    }
  }, [file]);

  function onButtonClick() {
    inputFile.current.click();
  }

  return (
    <>
      <p>
        Title image{" "}
        {`${
          file
            ? " - " + file.name
            : savedPost?.title_image
            ? " - " + savedPost.title_image
            : ""
        }`}
      </p>
      <div className="mt-2 mb-6 flex">
        <span className="cursor-pointer" onClick={onButtonClick}>
          <input
            type="file"
            id="file"
            onChange={handleFile}
            ref={inputFile}
            style={{ display: "none" }}
          />

          <ImageSVG />
        </span>
      </div>
    </>
  );
};

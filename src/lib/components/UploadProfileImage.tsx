import { useDispatch, useSelector } from "react-redux";
import { setError } from "../slices/appSlice";
import { setMe } from "../../auth/slices/authSlice";
import { RootState } from "../../store";
import { uploadProfileImage } from "../api/account";
import { ProfileImage } from "../../profile/components/ProfileImage";
import { MyButton } from "./Button";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import { NextSVG } from "../svgs/NextSVG";
import { useNavigate } from "react-router-dom";

export const UploadProfileImage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { me } = useSelector((state: RootState) => state.auth);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imageUploading, setImageUploading] = useState(false);

  const inputRef = useRef<any>(null);

  const uploadImage = async (image: File) => {
    const formData = new FormData();

    formData.append("image", image);

    return await uploadProfileImage(formData, me.sub);
  };

  useEffect(() => {
    if (imageFile) {
      setImageUploading(true);

      uploadImage(imageFile)
        .then((res) => {
          dispatch(setMe({ image: res.data.image }));
        })
        .catch((reason: any) => {
          dispatch(setError(reason.response.data.message[0]));
        })
        .finally(() => {
          setImageUploading(false);
        });
    }
  }, [imageFile]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files?.length) {
      setImageFile(files[0]);
    }
  }

  const clickInput = () => {
    inputRef.current.click();
  };

  return (
    <div className="mt-20 mb-20">
      <h3 className="text-3xl text-center mt-4 mb-4 ">
        {me.display_name || "Walter White"}
      </h3>

      {imageUploading ? (
        <div className="flex justify-center pt-12 pb-12 ">
          <Spinner w={90} h={90} />
        </div>
      ) : (
        <ProfileImage url={me.image} />
      )}

      <div className="flex justify-center mt-8">
        <div className="">
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleFile}
          />
          <MyButton
            buttonText="UPLOAD PROFILE IMAGE"
            onClickEvent={clickInput}
            classProperties={`px-4 ${imageUploading ? "bg-zinc-400" : ""}`}
            disabled={imageUploading}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center ">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          <NextSVG w="40" h="40" />
        </span>
      </div>
    </div>
  );
};

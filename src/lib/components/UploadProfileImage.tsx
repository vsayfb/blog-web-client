import { useDispatch, useSelector } from "react-redux";
import { setError } from "../slices/appSlice";
import { setMe } from "../../auth/slices/authSlice";
import { RootState } from "../../store";
import { uploadProfileImage } from "../api/account";
import { ProfileImage } from "../../profile/components/ProfileImage";
import { MyButton } from "./Button";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

export const UploadProfileImage = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imageUploading, setImageUploading] = useState(false);

  const inputRef = useRef<any>(null);

  const uploadImage = async (image: File) => {
    const formData = new FormData();

    formData.append("image", image);

    return await uploadProfileImage(formData);
  };

  useEffect(() => {
    if (imageFile) {
      setImageUploading(true);

      uploadImage(imageFile)
        .then((res) => {
          dispatch(setMe({ image: res.data }));
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
    <>
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
    </>
  );
};

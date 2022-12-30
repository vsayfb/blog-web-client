import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMe } from "../../auth/slices/authSlice";
import { MyButton } from "../../lib/components/Button";
import Spinner from "../../lib/components/Spinner";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { ProfileImage } from "../../profile/components/ProfileImage";
import { RootState } from "../../store";

export const SettingsLeft = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  const [imageUploading, setImageUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const inputFile = useRef<any>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files?.length) {
      setFile(files[0]);
    }
  }

  function onButtonClick() {
    inputFile.current.click();
  }

  async function uploadProfileImage(
    image: File
  ): Promise<{ data: { image: string } }> {
    const formData = new FormData();

    formData.set("image", image);

    const result: { data: { image: string } } = await sendRequest(
      "profiles/update_image/account/" + me.sub,
      "patch",
      true,
      formData
    );

    return result;
  }

  useEffect(() => {
    if (file) {
      setImageUploading(true);

      uploadProfileImage(file)
        .then((res) => {
          dispatch(setMe({ image: res.data.image }));
        })
        .catch((reason) => {
          dispatch(setError(reason.response.data.message[0]));
        })
        .finally(() => {
          setImageUploading(false);
        });
    }
  }, [file]);

  return (
    <div className="col-span-12 lg:col-span-3 flex-row">
      {imageUploading ? (
        <div className="flex justify-center mt-14 pb-16">
          <Spinner h={50} w={50} />
        </div>
      ) : (
        <ProfileImage url={me.image} />
      )}

      <h3 className="text-center text-2xl mt-4 mb-4  ">{me.display_name}</h3>

      <div className="flex justify-center">
        <input
          type="file"
          id="file"
          onChange={handleFile}
          ref={inputFile}
          style={{ display: "none" }}
        />
        <MyButton
          buttonText="UPDATE IMAGE"
          onClickEvent={onButtonClick}
          classProperties={`w-48 ${imageUploading ? "bg-zinc-400" : ""}`}
          disabled={imageUploading}
        />
      </div>
    </div>
  );
};

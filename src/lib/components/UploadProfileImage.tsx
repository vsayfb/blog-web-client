import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices/appSlice";
import { setPictureToMe } from "../slices/authSlice";
import { RootState } from "../../store";
import { uploadProfileImage } from "../api/account";

export const UploadProfileImage = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);

  const uploadImage = async (e: any) => {
    dispatch(setLoading());

    const image = e.target.files[0];

    const formData = new FormData();

    formData.append("image", image);

    try {
      const { newImage } = await uploadProfileImage(formData);
      dispatch(setPictureToMe(newImage));
    } catch (error) {
    } finally {
      dispatch(setLoading());
    }
  };

  const clickInput = () => {
    var input = document.createElement("input");

    input.type = "file";

    input.onchange = uploadImage;

    input.click();
  };

  return (
    <div>
      <div className="text-center">
        <b>Upload profile photo</b>
      </div>
      <div className="flex justify-center mt-4 ">
        <div
          className="rounded-full bg-no-repeat bg-center relative"
          style={{
            backgroundImage: `url(${
              me.image ||
              "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
            })`,
            height: "200px",
            width: "200px",
          }}
        >
          <svg
            onClick={clickInput}
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            className="bi bi-camera cursor-pointer absolute left-0 right-0 top-0 bottom-0 ml-auto mr-auto mb-auto mt-auto"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

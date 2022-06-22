import { SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../../lib/slices/appSlice";
import { uploadTitleImageForPost } from "../../lib/api/post";
import { handleFileArea } from "../../lib/handleFileArea";
import { ImageSVG } from "../../lib/svgs/ImageSVG";
import { CreatePostDto } from "../../screens/WritePost";

export const TitleImage = ({
  postData,
  setPostData,
}: {
  postData: CreatePostDto;
  setPostData: React.Dispatch<SetStateAction<any>>;
}) => {
  const dispatch = useDispatch();

  const handleFile = () => {
    handleFileArea(async (files: Blob[]) => {
      try {
        const titleImage = await uploadTitleImageForPost(files[0]);

        setPostData((prev: any) => ({ ...prev, titleImage }));
      } catch (error: any) {
        dispatch(setError(error.response.data.message));
      }
    });
  };

  return (
    <>
      <p>Title image</p>
      <div className="mt-2 mb-6 cursor-pointer flex" onClick={handleFile}>
        <ImageSVG />
        {postData.titleImage ? (
          <a
            href={postData.titleImage}
            className="ml-4 text-orange-700 items-center align-center"
            target="_blank"
          >
            Current Image
          </a>
        ) : null}
      </div>
    </>
  );
};

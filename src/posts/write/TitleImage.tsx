import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../lib/slices/appSlice";
import { uploadTitleImageForPost } from "../../lib/api/post";
import { handleFileArea } from "../../lib/handleFileArea";
import { ImageSVG } from "../../lib/svgs/ImageSVG";
import { addTitleImageToPost } from "../slices/postsSlice";
import { RootState } from "../../store";

export const TitleImage = () => {
  const { savedPost } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  const handleFile = () => {
    handleFileArea(async (files: Blob[]) => {
      try {
        const titleImage = await uploadTitleImageForPost(files[0]);

        dispatch(addTitleImageToPost(titleImage));
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
        {savedPost?.title_image ? (
          <a
            href={savedPost.title_image}
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

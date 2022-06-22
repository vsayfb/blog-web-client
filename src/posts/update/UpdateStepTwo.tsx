import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../lib/components/Button";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { updatePost } from "../../lib/api/post";
import { UpdatePostState } from "../../screens/UpdatePost";
import { TagsData } from "../TagsData";

export const UpdateStepTwo = ({
  updatePostData,
  setStep,
  setUpdatePost,
}: {
  updatePostData: UpdatePostState;
  setStep: React.Dispatch<SetStateAction<number>>;
  setUpdatePost: React.Dispatch<SetStateAction<UpdatePostState>>;
}) => {
  const navigate = useNavigate();

  async function completeStep() {
    try {
      const { url } = await updatePost(updatePostData.id, updatePostData);

      navigate("/" + url);
    } catch (error) {}
  }

  return (
    <>
      <div
        className="cursor-pointer"
        style={{ width: "24px" }}
        onClick={() => setStep(1)}
      >
        <BackSVG />
      </div>

      <div>
        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-zinc-900 mb-8 mt-4">
          {!updatePostData.tags.length
            ? "Add tags your post"
            : "Update your post tags"}
        </p>

        <TagsData setPostData={setUpdatePost} tagsData={updatePostData.tags} />

        <MyButton buttonText="PUBLISH" onClickEvent={completeStep} />
      </div>
    </>
  );
};

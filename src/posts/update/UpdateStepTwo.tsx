import { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../lib/components/Button";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { updatePost } from "../../lib/api/post";
import { TagsData } from "../../tags/TagsData";
import { PostViewDto } from "../../lib/types/post";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { resetTags, setTags } from "../../tags/slices/tagsSlice";
import { resetSavedPost } from "../slices/postsSlice";

export const UpdateStepTwo = ({
  savedPost,
  setStep,
}: {
  savedPost: PostViewDto;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const { tagNames } = useSelector((state: RootState) => state.tags);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!tagNames.length) {
      dispatch(setTags(savedPost.tags.map((t) => t.name)));
    }
  }, []);

  async function completeStep() {
    try {
      const { data } = await updatePost(savedPost.id, {
        ...savedPost,
        tags: tagNames,
      });

      navigate("/" + data.url);

      dispatch(resetTags());
      dispatch(resetSavedPost());
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
          {!tagNames.length ? "Add tags your post" : "Update your post tags"}
        </p>

        <TagsData />

        <MyButton buttonText="PUBLISH" onClickEvent={completeStep} />
      </div>
    </>
  );
};

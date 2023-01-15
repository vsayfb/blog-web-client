import { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../lib/components/Button";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { updatePost } from "../../lib/api/post";
import { PostTagsData } from "../../tags/components/PostTagsData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { resetTags, setTags } from "../../tags/slices/tagsSlice";
import { resetSavedPost } from "../slices/postsSlice";
import { setError } from "../../lib/slices/appSlice";
import { UpdatedPostDto } from "../types/post-view.dto";

export const UpdateStepTwo = ({
  savedPost,
  setStep,
}: {
  savedPost: UpdatedPostDto;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const { postTagNames } = useSelector((state: RootState) => state.tags);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!postTagNames.length) {
      dispatch(setTags(savedPost.tags.map((t) => t.name)));
    }
  }, []);

  async function completeStep() {
    try {
      const { data } = await updatePost(savedPost.id, {
        ...savedPost,
        tags: postTagNames,
      });

      navigate("/" + data.url);

      dispatch(resetTags());
      dispatch(resetSavedPost());
    } catch (error: any) {
      dispatch(setError(error.response.data.message[0]));
    }
  }

  return (
    <div className="h-screen">
      <div
        className="cursor-pointer"
        style={{ width: "24px" }}
        onClick={() => setStep(1)}
      >
        <BackSVG />
      </div>

      <div>
        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-zinc-900 mb-8 mt-4">
          {!postTagNames.length
            ? "Add tags your post"
            : "Update your post tags"}
        </p>

        <PostTagsData />

        <MyButton buttonText="SAVE" onClickEvent={completeStep} />
      </div>
    </div>
  );
};

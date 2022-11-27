import { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../lib/components/Button";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { updatePost } from "../../lib/api/post";
import { CreatePostDto } from "../../screens/WritePost";
import { PostTagsData } from "../../tags/components/PostTagsData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setError } from "../../lib/slices/appSlice";
import { resetTags } from "../../tags/slices/tagsSlice";
import { resetSavedPost } from "../slices/postsSlice";

export const StepTwo = ({
  setStep,
}: {
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { savedPost } = useSelector((state: RootState) => state.posts);
  const { postTagNames } = useSelector((state: RootState) => state.tags);

  async function complete() {
    try {
      if (savedPost) {
        const result = await updatePost(savedPost.id, {
          ...savedPost,
          tags: postTagNames,
          published: true,
        });

        dispatch(resetTags());

        dispatch(resetSavedPost());

        navigate("/" + result.data.url);
      }
    } catch (error: any) {
      dispatch(setError(error.response.data.message[0]));
    }
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
          Add tags to your post
        </p>
      </div>

      <PostTagsData />

      <MyButton onClickEvent={complete} buttonText="PUBLISH" />
    </>
  );
};

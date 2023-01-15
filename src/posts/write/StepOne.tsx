import { PostEditor } from "../components/PostEditor";
import { SetStateAction, useState } from "react";
import { MyButton } from "../../lib/components/Button";
import { InputField } from "../../lib/components/InputField";
import { CreatePostDto } from "../../screens/WritePost";
import { updatePost, uploadPost } from "../../lib/api/post";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../lib/slices/appSlice";
import { TitleImage } from "./TitleImage";
import { RootState } from "../../store";
import { setSavedPost } from "../slices/postsSlice";
import { YesOrNoModal } from "../../lib/modals/YesOrNoModal";
import { UpdatedPostDto, PostViewDto } from "../types/post-view.dto";
import Spinner from "../../lib/components/Spinner";

export const StepOne = ({
  postData,
  setPostData,
  setStep,
}: {
  postData: CreatePostDto;
  setPostData: React.Dispatch<SetStateAction<CreatePostDto>>;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const { savedPost } = useSelector((state: RootState) => {
    return state.posts;
  });
  const [yesOrNoVisibility, setYesOrNoVisibility] = useState(false);

  const [postUploading, setPostUploading] = useState(false);

  async function completeStep() {
    setPostUploading(true);
    try {
      let result: UpdatedPostDto;

      if (!savedPost) {
        result = (await uploadPost(postData, false)).data;

        setYesOrNoVisibility(true);
      } else {
        // user went to the second step and came back and nothing changed just go second step, do not request

        if (
          savedPost.title === postData.title &&
          savedPost.content === postData.content &&
          savedPost.title_image === postData.title_image
        ) {
          result = savedPost;
          setStep(2);
        } else {
          result = (await updatePost(savedPost.id, postData)).data;
          setYesOrNoVisibility(true);
        }
      }

      dispatch(setSavedPost(result));
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
    } finally {
      setPostUploading(false);
    }
  }

  function nextStep() {
    setStep(2);
    setYesOrNoVisibility(false);
  }

  return (
    <>
      {yesOrNoVisibility ? (
        <YesOrNoModal
          title="Want to go next step?"
          text="The post saved."
          yesFunction={() => nextStep()}
          noFunction={() => setYesOrNoVisibility(false)}
        />
      ) : null}

      <p className="focus:outline-none text-2xl font-extrabold leading-6  mb-8 mt-4">
        Write your post
      </p>

      <div className="mt-4 mb-4">
        <InputField
          labelText="Title"
          onChangeEvent={(e) =>
            setPostData((prev) => ({ ...prev, title: e.target.value }))
          }
          value={postData.title}
          type="text"
        />
      </div>

      <TitleImage
        setTitleImage={(title_image) =>
          setPostData((p) => ({ ...p, title_image }))
        }
      />

      <p className="mb-5"> Content</p>

      <PostEditor
        getEditorContent={(content: string) =>
          setPostData((prev) => ({ ...prev, content }))
        }
        content={postData.content}
      />

      <div className="mt-12">
        {postUploading ? (
          <div className="flex justify-center">
            <Spinner w={40} h={40} />
          </div>
        ) : (
          <MyButton buttonText="SAVE" onClickEvent={completeStep} />
        )}
      </div>
    </>
  );
};

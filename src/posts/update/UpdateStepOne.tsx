import React, { SetStateAction, useEffect, useState } from "react";
import { MyButton } from "../../lib/components/Button";
import { PostEditor } from "../components/PostEditor";
import { InputField } from "../../lib/components/InputField";
import { updatePost } from "../../lib/api/post";
import { TitleImage } from "../write/TitleImage";
import { useDispatch } from "react-redux";
import {
  addTitleImageToSavedPost,
  setSavedPost,
  updateSavedPost,
} from "../slices/postsSlice";
import { sendRequest } from "../../lib/sendRequest";
import { setError, setLoading } from "../../lib/slices/appSlice";
import { UpdatedPostDto } from "../types/post-view.dto";
import { YesOrNoModal } from "../../lib/modals/YesOrNoModal";

export const UpdateStepOne = ({
  savedPost,
  setStep,
}: {
  savedPost: UpdatedPostDto;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();

  const [oldContent, setOldContent] = useState(savedPost);

  const [yesOrNoVisibility, setYesOrNoVisibility] = useState(false);

  async function completeStep() {
    try {
      const result = await updatePost(savedPost.id, {
        ...savedPost,
        // do not update tags, it is job of second step
        tags: undefined,
      });

      dispatch(setSavedPost(result.data));

      if (
        oldContent.title === savedPost.title &&
        oldContent.content === savedPost.content &&
        oldContent.title_image === savedPost.title_image
      ) {
        setStep(2);
      } else setYesOrNoVisibility(true);
    } catch (error) {}
  }

  async function updatePostImage(image: File) {
    const formData = new FormData();

    formData.set("titleImage", image);

    return await sendRequest(
      `posts/update_title_image/${savedPost.id}`,
      "put",
      true,
      formData
    );
  }

  useEffect(() => {
    //@ts-ignore  that means it is a file
    if (savedPost?.title_image?.name) {
      dispatch(setLoading());

      updatePostImage(savedPost.title_image as unknown as File)
        .then((file) => {
          dispatch(addTitleImageToSavedPost(file.data));
        })
        .catch((reason) => {
          dispatch(setError(reason.response.data.message));
        })
        .finally(() => {
          dispatch(setLoading());
        });
    }
  }, [savedPost.title_image]);

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

      <InputField
        labelText="New Title"
        onChangeEvent={(e) =>
          dispatch(updateSavedPost({ title: e.target.value }))
        }
        value={savedPost.title}
      />

      <TitleImage
        setTitleImage={(file) => {
          dispatch(addTitleImageToSavedPost(file));
        }}
      />

      <div className="mt-6">
        <p className="mb-4 text-sm">Content</p>
        <PostEditor
          content={savedPost.content}
          getEditorContent={(content) => dispatch(updateSavedPost({ content }))}
        />
      </div>

      <div className="mt-5">
        <MyButton buttonText="Save" onClickEvent={completeStep} />
      </div>
    </>
  );
};

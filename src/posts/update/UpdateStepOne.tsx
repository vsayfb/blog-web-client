import React, { SetStateAction, useEffect } from "react";
import { MyButton } from "../../lib/components/Button";
import { PostEditor } from "../../lib/components/PostEditor";
import { InputField } from "../../lib/components/InputField";
import { updatePost } from "../../lib/api/post";
import { TitleImage } from "../write/TitleImage";
import { useDispatch } from "react-redux";
import {
  addTitleImageToSavedPost,
  SavedPost,
  setSavedPost,
  updateSavedPost,
} from "../slices/postsSlice";
import { sendRequest } from "../../lib/sendRequest";
import { setError, setLoading } from "../../lib/slices/appSlice";

export const UpdateStepOne = ({
  savedPost,
  setStep,
}: {
  savedPost: SavedPost;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();

  async function completeStep() {
    try {
      const result = await updatePost(savedPost.id, {
        ...savedPost,
        // do not update tags, it is job of second step
        tags: undefined,
      });

      dispatch(setSavedPost(result.data));

      setStep(2);
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

      updatePostImage(savedPost.title_image as File)
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

  return (
    <>
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

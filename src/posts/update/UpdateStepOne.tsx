import React, { SetStateAction } from "react";
import { MyButton } from "../../lib/components/Button";
import { Editor } from "../../lib/components/Editor";
import { InputField } from "../../lib/components/InputField";
import { updatePost } from "../../lib/api/post";
import { TitleImage } from "../write/TitleImage";
import { useDispatch } from "react-redux";
import { PostViewDto } from "../../lib/types/post";
import { setSavedPost, updateSavedPost } from "../slices/postsSlice";

export const UpdateStepOne = ({
  savedPost,
  setStep,
}: {
  savedPost: PostViewDto;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();

  async function completeStep() {
    try {
      const result = await updatePost(savedPost.id, {
        ...savedPost,
        // do not update tags it is job of second step
        tags: undefined,
      });

      dispatch(setSavedPost(result.data));

      setStep(2);
    } catch (error) {}
  }

  return (
    <>
      <InputField
        labelText="New Title"
        onChangeEvent={(e) =>
          dispatch(updateSavedPost({ title: e.target.value }))
        }
        value={savedPost.title}
      />

      <TitleImage />

      <div className="mt-6">
        <p className="mb-4 text-sm">Content</p>
        <Editor
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

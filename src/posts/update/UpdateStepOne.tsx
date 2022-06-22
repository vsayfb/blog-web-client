import React, { SetStateAction } from "react";
import { MyButton } from "../../lib/components/Button";
import { Editor } from "../../lib/components/Editor";
import { InputField } from "../../lib/components/InputField";
import { updatePost } from "../../lib/api/post";
import { UpdatePostState } from "../../screens/UpdatePost";
import { TitleImage } from "../write/TitleImage";

export const UpdateStepOne = ({
  updatePostData,
  setUpdatePost,
  setStep,
}: {
  updatePostData: UpdatePostState;
  setUpdatePost: React.Dispatch<SetStateAction<UpdatePostState>>;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  async function completeStep() {
    try {
      const { id, title, content, published, titleImage, tags } =
        await updatePost(updatePostData.id, updatePostData);

      setUpdatePost({
        id,
        title,
        content,
        published,
        titleImage,
        tags: tags.map((tag) => tag.name),
      });

      setStep(2);
    } catch (error) {}
  }

  return (
    <>
      <InputField
        labelText="New Title"
        onChangeEvent={(e) =>
          setUpdatePost((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        value={updatePostData.title}
      />

      <TitleImage postData={updatePostData} setPostData={setUpdatePost} />

      <div className="mt-6">
        <p className="mb-4 text-sm">Content</p>
        <Editor
          content={updatePostData.content}
          getEditorContent={(content) =>
            setUpdatePost((prev) => ({ ...prev, content }))
          }
        />
      </div>

      <div className="mt-5">
        <MyButton buttonText="Save" onClickEvent={completeStep} />
      </div>
    </>
  );
};

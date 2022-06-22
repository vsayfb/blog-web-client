import { Editor } from "../../lib/components/Editor";
import { SetStateAction } from "react";
import { MyButton } from "../../lib/components/Button";
import { InputField } from "../../lib/components/InputField";
import { CreatePostDto } from "../../screens/WritePost";
import { uploadPost } from "../../lib/api/post";
import { useDispatch } from "react-redux";
import { setError } from "../../lib/slices/appSlice";
import { TitleImage } from "./TitleImage";

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

  async function completeStep() {
    try {
      // the post already saved, just go next step
      if (postData.id) {
        setStep(2);
      } else {
        const { id } = await uploadPost(postData, false);

        setPostData((prev) => ({ ...prev, id }));

        setStep(2);
      }
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
    }
  }

  return (
    <>
      <p className="focus:outline-none text-2xl font-extrabold leading-6 text-zinc-900 mb-8 mt-4">
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

      <TitleImage postData={postData} setPostData={setPostData} />

      <p className="mb-5"> Content</p>

      <Editor
        getEditorContent={(content: any) =>
          setPostData((prev) => ({ ...prev, content }))
        }
        content={postData.content}
      />

      <div className="mt-5">
        <MyButton buttonText="SAVE" onClickEvent={completeStep} />
      </div>
    </>
  );
};

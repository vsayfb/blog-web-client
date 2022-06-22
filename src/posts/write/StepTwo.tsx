import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../lib/components/Button";
import { BackSVG } from "../../lib/svgs/BackSVG";
import { updatePost } from "../../lib/api/post";
import { CreatePostDto } from "../../screens/WritePost";
import { TagsData } from "../TagsData";

export const StepTwo = ({
  postData,
  setStep,
  setPostData,
}: {
  postData: CreatePostDto;
  setStep: React.Dispatch<SetStateAction<number>>;
  setPostData: React.Dispatch<SetStateAction<CreatePostDto>>;
}) => {
  const navigate = useNavigate();

  async function complete() {
    try {
      const result = await updatePost(postData.id, {
        ...postData,
        published: true,
      });
      navigate("/" + result.url);
    } catch (error) {
      console.log(error);
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

      <TagsData setPostData={setPostData} tagsData={postData.tags} />

      <MyButton onClickEvent={complete} buttonText="PUBLISH" />
    </>
  );
};

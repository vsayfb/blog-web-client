import { useState } from "react";
import { Helmet } from "react-helmet";
import { StepOne } from "../posts/write/StepOne";
import { StepTwo } from "../posts/write/StepTwo";

export type CreatePostDto = {
  id: string;
  title: string;
  content: string;
  titleImage: string | null;
  tags: string[];
};

export const WritePost = () => {
  const [postData, setPostData] = useState<CreatePostDto>({
    // id field is for updating the post after it has been saved
    id: "",
    title: "",
    content: "",
    titleImage: null,
    tags: [],
  });

  const [step, setStep] = useState(1);

  return (
    <div className="mr-20 ml-20 pt-16 pb-16">
      <Helmet>
        <title>Write a post</title>
      </Helmet>

      {step === 1 ? (
        <StepOne
          postData={postData}
          setPostData={setPostData}
          setStep={setStep}
        />
      ) : step === 2 ? (
        <StepTwo
          setStep={setStep}
          postData={postData}
          setPostData={setPostData}
        />
      ) : null}
    </div>
  );
};

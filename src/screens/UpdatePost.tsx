import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getPost } from "../lib/api/post";
import { UpdateStepOne } from "../posts/update/UpdateStepOne";
import { UpdateStepTwo } from "../posts/update/UpdateStepTwo";

export type UpdatePostState = {
  id: string;
  title: string;
  content: string;
  published: boolean | undefined;
  titleImage: string | null;
  tags: string[];
};

export const UpdatePost = () => {
  const [updatePostData, setUpdatePost] = useState<UpdatePostState>({
    id: "",
    title: "",
    content: "",
    published: undefined,
    titleImage: null,
    tags: [],
  });

  const { id } = useParams();

  const [step, setStep] = useState(1);

  async function getUpdatePost(postID: string) {
    const { id, title, content, published, titleImage, tags } = await getPost(
      postID
    );

    const tagsArray = tags.length ? tags.map((tag) => tag.name) : [];

    setUpdatePost({
      id,
      title,
      content,
      published,
      titleImage,
      tags: tagsArray,
    });
  }

  async function nextStep() {}

  useEffect(() => {
    if (id) getUpdatePost(id);
  }, [id]);

  if (!updatePostData.id) return null;

  return (
    <div className="mr-20 ml-20 pt-16 pb-16">
      <Helmet>
        <title>Udate {updatePostData.title}</title>
      </Helmet>

      {step === 1 ? (
        <UpdateStepOne
          setUpdatePost={setUpdatePost}
          updatePostData={updatePostData}
          setStep={setStep}
        />
      ) : (
        <UpdateStepTwo
          setUpdatePost={setUpdatePost}
          updatePostData={updatePostData}
          setStep={setStep}
        />
      )}
    </div>
  );
};

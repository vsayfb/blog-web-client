import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../lib/api/post";
import { setSavedPost } from "../posts/slices/postsSlice";
import { UpdateStepOne } from "../posts/update/UpdateStepOne";
import { UpdateStepTwo } from "../posts/update/UpdateStepTwo";
import { RootState } from "../store";

export const UpdatePost = () => {
  const { id } = useParams();

  const { savedPost } = useSelector((state: RootState) => state.posts);

  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  async function getUpdatePost(postID: string) {
    const { data } = await getPost(postID);

    dispatch(setSavedPost(data || null));
  }

  useEffect(() => {
    if (id) getUpdatePost(id);
  }, [id]);

  if (!savedPost) return null;

  return (
    <div className="mr-20 ml-20 pt-16 pb-16 ">
      <Helmet>
        <title>Update {savedPost.title}</title>
      </Helmet>

      {step === 1 ? (
        <UpdateStepOne savedPost={savedPost} setStep={setStep} />
      ) : (
        <UpdateStepTwo savedPost={savedPost} setStep={setStep} />
      )}
    </div>
  );
};

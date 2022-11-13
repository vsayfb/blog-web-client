import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../lib/components/InputField";
import { setError } from "../../lib/slices/appSlice";
import { DashSVG } from "../../lib/svgs/DashSVG";
import { RootState } from "../../store";
import { removeTag, setNewTag } from "../slices/tagsSlice";
import { TagBox } from "./TagBox";

export const PostTagsData = () => {
  const { postTagNames } = useSelector((state: RootState) => state.tags);

  const dispatch = useDispatch();

  const [tagValue, setTagValue] = useState<string>("");

  function addNewTag(e: any) {
    e.preventDefault();

    if (postTagNames.length < 3) {
      dispatch(setNewTag(tagValue));
    } else dispatch(setError("The number of tags must be 3 or less. "));

    setTagValue("");
  }

  return (
    <>
      <form onSubmit={addNewTag}>
        <InputField
          labelText="Type a tag and press enter"
          value={tagValue}
          onChangeEvent={(e) => setTagValue(e.target.value)}
          type="text"
        />
      </form>

      <div className="mt-6 mb-6 flex">
        {postTagNames.length
          ? postTagNames.map((name) => (
              <div key={name} className="relative">
                <TagBox key={name} name={name} />

                <div
                  onClick={() => dispatch(removeTag(name))}
                  className="absolute cursor-pointer"
                  style={{ right: "5px", top: "-7px" }}
                >
                  <DashSVG />
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

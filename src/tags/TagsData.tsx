import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../lib/components/InputField";
import { setError } from "../lib/slices/appSlice";
import { DashSVG } from "../lib/svgs/DashSVG";
import { RootState } from "../store";
import { removeTag, setNewTag } from "./slices/tagsSlice";
import { Tag } from "./Tag";

export const TagsData = () => {
  const { tagNames } = useSelector((state: RootState) => state.tags);

  const dispatch = useDispatch();

  const [tagValue, setTagValue] = useState<string>("");

  function addNewTag(e: any) {
    e.preventDefault();

    if (tagNames.length < 3) {
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
        {tagNames.length
          ? tagNames.map((name) => (
              <div key={name} className="relative">
                <Tag key={name} name={name} />

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

import { SetStateAction, useEffect, useState } from "react";
import { InputField } from "../lib/components/InputField";
import { DashSVG } from "../lib/svgs/DashSVG";
import { Tag } from "../tags/Tag";

export const TagsData = ({
  tagsData,
  setPostData,
}: {
  tagsData: string[];
  setPostData: React.Dispatch<SetStateAction<any>>;
}) => {
  const [tags, setTags] = useState<string[]>(tagsData);

  const [tagValue, setTagValue] = useState<string>("");

  function addNewTag(e: any) {
    e.preventDefault();

    const newTags = [...tags, tagValue];

    if (newTags.length <= 3) {
      setTags(newTags);
    } else alert("max tag");

    setTagValue("");
  }

  function removeTag(tagName: string) {
    setTags(tags.filter((tag) => tag !== tagName));
  }

  useEffect(() => {
    setPostData((prev: any) => ({ ...prev, tags }));
  }, [tags]);

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
        {tags.length
          ? tags.map((tag) => (
              <div key={tag} className="relative">
                <Tag key={tag} name={tag} />

                <div
                  onClick={() => removeTag(tag)}
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

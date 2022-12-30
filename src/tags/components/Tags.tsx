import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import Spinner from "../../lib/components/Spinner";
import { sendRequest } from "../../lib/sendRequest";
import { TagSVG } from "../svgs/TagSVG";
import { TagCreatedBy } from "./TagCreatedBy";

export const Tags = () => {
  const [tagsLoading, setTagsLoading] = useState(false);

  const [tags, setTags] = useState<
    { id: string; name: string; author: AccountViewDto }[]
  >([]);

  useEffect(() => {
    setTagsLoading(true);
    sendRequest("tags", "get", false)
      .then((tags) => {
        setTags(tags.data);
      })
      .finally(() => {
        setTagsLoading(false);
      });
  }, []);

  if (!tags.length) {
    if (tagsLoading)
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center  pb-16 h-screen">
          <Spinner h={70} w={70} />
        </div>
      );

    return (
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
        <div className="flex items-center mt-16">
          <TagSVG />

          <div className="ml-4">
            <h3 className="text-2xl">There are no tags to show.</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 ">
      {tags.map((t) => (
        <Link
          key={t.id}
          to={`/tag/${t.name}`}
          className="mr-20 mt-12 text-lg inline-block font-bold leading-sm  px-3 py-1 rounded-md  pt-4 pb-4 "
        >
          <div className="inline-flex items-center uppercase">
            <TagSVG />
            <span className="ml-2">{t.name}</span>
          </div>

          <TagCreatedBy account={t.author} />
        </Link>
      ))}
    </div>
  );
};

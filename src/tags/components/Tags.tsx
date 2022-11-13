import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import Spinner from "../../lib/components/Spinner";
import { sendRequest } from "../../lib/sendRequest";
import { TagSVG } from "../svgs/TagSVG";
import { TagCreatedBy } from "./TagCreatedBy";

export const Tags = () => {
  const [tagsLoading, setTagsLoading] = useState([]);

  const [tags, setTags] = useState<
    { id: string; name: string; author: AccountViewDto }[]
  >([]);

  useEffect(() => {
    sendRequest("tags", "get", false).then((tags) => {
      setTags(tags.data);
    });
  }, []);

  if (!tags.length) {
    if (tagsLoading)
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-screen pb-16">
          <Spinner h={70} w={70} />
        </div>
      );

    return null;
  }

  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
      {tags.map((t) => (
        <Link
          to={`/tag/${t.name}`}
          className="mr-4 text-lg inline-block font-bold leading-sm  px-3 py-1 bg-orange-200 text-orange-700"
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

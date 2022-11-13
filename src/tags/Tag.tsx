import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { AccountViewDto } from "../accounts/types/account-view-dto";
import Spinner from "../lib/components/Spinner";
import { sendRequest } from "../lib/sendRequest";
import { PostCard } from "../posts/components/PostCard";
import { NotFound } from "../screens/NotFound";
import { TagSVG } from "./svgs/TagSVG";
import { TagCreatedBy } from "./TagCreatedBy";

type TagPostsDto = {
  id: string;
  title: string;
  title_image: string | null;
  url: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    username: string;
    image: string | null;
  };

  published: true;
  created_at: string;
  updated_at: string;
}[];

export const Tag = () => {
  const [tagLoading, setTagLoading] = useState(true);

  const [tag, setTag] = useState<{
    id: string;
    name: string;
    posts: TagPostsDto;
    author: AccountViewDto;
  } | null>(null);

  const { name } = useParams();

  useEffect(() => {
    sendRequest(`tags/${name}`, "get", false)
      .then((tag) => {
        setTag(tag.data);
      })
      .finally(() => {
        setTagLoading(false);
      });

    return () => {
      setTag(null);
    };
  }, [name]);

  if (!tag?.name) {
    if (tagLoading) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-screen pb-16">
          <Spinner h={70} w={70} />
        </div>
      );
    }

    return (
      <NotFound
        message="we could not find this tag."
        pageTitle="Tag Not Found."
      />
    );
  } else {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Tag - {tag.name.toUpperCase()}</title>
        </Helmet>

        <div
          style={{ width: "250px" }}
          className="sm:ml-12 mr-4 text-lg mt-12 flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700"
        >
          <TagSVG />
          <span className="ml-2">{tag.name}</span>
        </div>

        <div className="sm:ml-12 mr-4 text-lg mt-12 inline-flex items-center font-bold leading-sm uppercase px-4 py-1 mb-2 bg-orange-200 text-orange-700 ">
          <TagCreatedBy account={tag.author} imageHeight={25} imageWidth={25} />
        </div>

        <div className="mt-8 ">
          {tag.posts.length ? (
            tag.posts.map((p) => (
              <PostCard post={{ ...p, tags: [] }} key={p.id} />
            ))
          ) : (
            <h3 className="sm:ml-12">There are no posts for this tag.</h3>
          )}
        </div>
      </div>
    );
  }
};

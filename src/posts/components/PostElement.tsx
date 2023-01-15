import { detectImage } from "../../lib/detectImage";
import { CreatedAtSVG } from "../../lib/svgs/CreatedAtSVG";
import { TagBox } from "../../tags/components/TagBox";
import { PostComments } from "../../comments/components/PostComments";
import { PostViewDto } from "../types/post-view.dto";
import { Link } from "react-router-dom";
import { PostStats } from "./PostStats";
import moment from "moment";
import { calculateReadTime } from "../../lib/calculateReadTime";
import { BookSVG } from "../../lib/svgs/BookSVG";
import { useEffect, useState } from "react";
import { sendRequest } from "../../lib/sendRequest";
import { TagViewDto } from "../../tags/types/tag-view.dto";
import Spinner from "../../lib/components/Spinner";

export const PostElement = ({ post }: { post: PostViewDto }) => {
  const { bookmarked_by, liked_by, disliked_by } = post;

  const [tags, setTags] = useState<TagViewDto[]>([]);

  const [stats, setStats] = useState<{
    bookmark_count: number;
    like_count: number;
    dislike_count: number;
  }>({ bookmark_count: 0, like_count: 0, dislike_count: 0 });

  const [tagsLoading, setTagsLoading] = useState(true);

  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    sendRequest("tags/post/" + post.id, "get", false).then((value) => {
      setTags(value.data);

      setTagsLoading(false);
    });
  }, [post.id]);

  useEffect(() => {
    if (tags) {
      sendRequest("bookmarks/post/count/" + post.id, "get", false).then(
        (value: { data: number }) => {
          setStats((p) => ({ ...p, bookmark_count: value.data }));

          sendRequest("expressions/count/post/" + post.id, "get", false).then(
            (value: {
              data: { like_count: number; dislike_count: number };
            }) => {
              setStats((p) => ({ ...p, ...value.data }));

              setStatsLoading(false);
            }
          );
        }
      );
    }
  }, [tags]);

  return (
    <div className={`relative pt-20 md:pt-40 pb-20  overflow-x-hidden  `}>
      {!statsLoading ? (
        <div className="p-4 absolute top-60">
          <PostStats
            postID={post.id}
            postAuthorID={post.author.id}
            stats={{
              ...stats,
              bookmarked_by,
              liked_by,
              disliked_by,
            }}
          />
        </div>
      ) : (
        <div className="p-4 absolute top-60">
          <Spinner />
        </div>
      )}

      <div className="container px-4 max-w-3xl mx-auto">
        <div className=" text-center">
          <h2
            className={`text-6xl md:text-7xl font-bold font-heading break-words `}
          >
            {post.title}
          </h2>
          <div className="inline-flex pt-14 mb-14 items-center">
            <img
              className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
              src={detectImage(post.author.image)}
              alt=""
            />
            <div className="text-left">
              <Link
                to={`/profile/${post.author.username}`}
                className={`mb-1 text-2xl font-bold font-heading `}
              >
                {post.author.display_name}
              </Link>
              <p className="text-gray-500 mt-2">
                joined {moment(post.author.created_at).fromNow()}
              </p>
            </div>
          </div>

          <div className="mb-16">
            {!tagsLoading ? (
              <div className="mt-6 ">
                {tags.map((tag) => (
                  <TagBox key={tag.id} name={tag.name} size="px-8" />
                ))}
              </div>
            ) : (
              <div className="mt-6 flex justify-center">
                <Spinner />
              </div>
            )}

            <div className="flex justify-center items-center mt-12">
              <div
                className="flex items-center"
                style={{ marginRight: "3rem" }}
              >
                <CreatedAtSVG />
                <b className="ml-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </b>
              </div>

              <div className="ml-6 flex items-center">
                <BookSVG h={17} w={17} />
                <b className="ml-2">{calculateReadTime(post.content)}</b>
              </div>
            </div>
          </div>
        </div>
        {post.title_image ? (
          <div className="relative -mx-6 mb-20">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-80 w-full bg-blue-300"></div>
            <img
              className="relative w-full h-96 px-6 object-cover"
              src={post.title_image}
              alt="Title Image"
            />
          </div>
        ) : null}

        <article dangerouslySetInnerHTML={{ __html: post.content }}></article>

        <section id="comments">
          {window.location.href.indexOf(
            process.env.REACT_APP_HOST + "/post/"
          ) == -1 ? (
            <PostComments postID={post.id} />
          ) : null}
        </section>
      </div>
    </div>
  );
};

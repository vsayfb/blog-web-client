import { detectImage } from "../../lib/detectImage";
import { CreatedAtSVG } from "../../lib/svgs/CreatedAtSVG";
import { TagBox } from "../../tags/components/TagBox";
import { PostComments } from "../../comments/components/PostComments";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PostViewDto } from "../types/post-view.dto";
import { Link } from "react-router-dom";
import { PostStats } from "./PostStats";
import moment from "moment";
import { calculateReadTime } from "../../lib/calculateReadTime";
import { BookSVG } from "../../lib/svgs/BookSVG";

export const PostElement = ({ post }: { post: PostViewDto }) => {
  const {
    bookmark_count,
    like_count,
    dislike_count,
    bookmarked_by,
    liked_by,
    disliked_by,
  } = post;

  return (
    <div className={`relative pt-20 md:pt-40 pb-20  overflow-x-hidden  `}>
      {post.published ? (
        <div className="p-4 absolute top-60">
          <PostStats
            postID={post.id}
            postAuthorID={post.author.id}
            stats={{
              bookmark_count,
              like_count,
              dislike_count,
              bookmarked_by,
              liked_by,
              disliked_by,
            }}
          />
        </div>
      ) : null}

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
            {post.tags.length ? (
              <div className="mt-6 ">
                {post.tags.map((tag) => (
                  <TagBox key={tag.id} name={tag.name} size="px-8" />
                ))}
              </div>
            ) : null}

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

        <article
          className={"light-content-tiny"}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>

        {post.published ? (
          <section id="comments">
            <PostComments postID={post.id} />
          </section>
        ) : null}
      </div>
    </div>
  );
};

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateReadTime } from "../../lib/calculateReadTime";
import { detectImage } from "../../lib/detectImage";
import { ChatIconSVG } from "../../lib/svgs/ChatIconSVG";
import { LikeFillSVG } from "../../lib/svgs/LikeFillSVG";
import { LikeSVG } from "../../lib/svgs/LikeSVG";
import { RootState } from "../../store";
import { TagBox } from "../../tags/components/TagBox";
import { PostCardDto } from "../types/post-card.dto";

export const PostCard = ({ post }: { post: PostCardDto }) => {
  return (
    <div className=" dark:text-gray-50 mt-6 mb-6 ">
      <div className="container grid grid-cols-12 mx-auto ">
        {post.title_image ? (
          <div
            className="bg-no-repeat bg-cover  col-span-full lg:col-span-4"
            style={{
              backgroundImage: `url(${post.title_image})`,
              backgroundPosition: "center center",
              backgroundBlendMode: "multiply",
              backgroundSize: "cover",
            }}
          ></div>
        ) : null}
        <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10 ">
          <div className="flex justify-start">
            <span className="px-2 py-1 text-xs rounded-full">
              {post.tags.length
                ? post.tags.map((tag) => (
                    <TagBox name={tag.name} key={tag.id} />
                  ))
                : null}
            </span>
          </div>

          <Link
            to={`/${post.url}`}
            className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm "
          >
            <h1 className="text-3xl font-semibold">{post.title}</h1>
          </Link>
          <Link
            to={`/profile/${post.author.username}`}
            className="flex items-center justify-between pt-2 "
          >
            <div className="flex space-x-2">
              <img
                className="h-8 w-8 rounded-full"
                src={detectImage(post.author.image)}
                alt=""
              />
              <div className="inline-flex items-center space-x-2 text-md font-bold ">
                {post.author.display_name}
              </div>
            </div>

            <div className="flex items-center ">
              {post.like_count !== undefined ? (
                <div className="flex items-center mr-8">
                  <LikeSVG w={21} h={21} />
                  <b className="ml-2">{post.like_count}</b>
                </div>
              ) : null}

              {post.comment_count !== undefined ? (
                <div className="flex items-center mr-8">
                  <ChatIconSVG w={17} h={17} />
                  <b className="ml-2">{post.comment_count}</b>
                </div>
              ) : null}
              <div>
                <b className="">{calculateReadTime(post.content)}</b>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

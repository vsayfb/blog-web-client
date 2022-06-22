import { Link } from "react-router-dom";
import { detectImage } from "../../lib/detectImage";
import { PostViewDto } from "../../lib/types/post";
import { Tag } from "../../tags/Tag";

export const PostCard = ({ post }: { post: PostViewDto }) => {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-50 mt-6 mb-6">
      <div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
        {post.titleImage ? (
          <div
            className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4"
            style={{
              backgroundImage: `url(${post.titleImage})`,
              backgroundPosition: "center center",
              backgroundBlendMode: "multiply",
              backgroundSize: "cover",
            }}
          ></div>
        ) : null}
        <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
          <div className="flex justify-start">
            <span className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900">
              {post.tags.length
                ? post.tags.map((tag) => <Tag name={tag.name} key={tag.id} />)
                : null}
            </span>
          </div>

          <Link
            to={post.url}
            className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-violet-400"
          >
            <h1 className="text-3xl font-semibold">{post.title}</h1>
          </Link>
          <div className="flex items-center justify-between pt-2">
            <div className="flex space-x-2">
              <img
                className="h-6 w-6 rounded-full"
                src={detectImage(post.author.image)}
                alt=""
              />
              <span className="self-center text-sm">
                {post.author.username}
              </span>
            </div>
            <span className="text-xs">3 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

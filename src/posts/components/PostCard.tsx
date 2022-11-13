import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detectImage } from "../../lib/detectImage";
import { RootState } from "../../store";
import { TagBox } from "../../tags/components/TagBox";
import { PostViewDto } from "../types/post-view.dto";

export const PostCard = ({ post }: { post: PostViewDto }) => {
  const { theme } = useSelector((state: RootState) => state.app);

  return (
    <div className=" dark:text-gray-50 mt-6 mb-6 text-zinc-900">
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
            className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-zinc-900"
          >
            <h1 className="text-3xl font-semibold">{post.title}</h1>
          </Link>
          <Link
            to={`/profile/${post.author.username}`}
            className="flex items-center justify-between pt-2 text-zinc-900"
          >
            <div className="flex space-x-2">
              <img
                className="h-8 w-8 rounded-full"
                src={detectImage(post.author.image)}
                alt=""
              />
              <div className="inline-flex items-center space-x-2 text-sm text-zinc-900">
                {post.author.username}
              </div>
            </div>
            <span className="text-xs">3 min read</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

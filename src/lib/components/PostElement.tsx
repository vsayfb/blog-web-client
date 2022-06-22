import { detectImage } from "../detectImage";
import { CreatedAtSVG } from "../svgs/CreatedAtSVG";
import { PostViewDto } from "../types/post";
import { Tag } from "../../tags/Tag";

export const PostElement = ({ post }: { post: PostViewDto }) => {
  return (
    <article className="relative pt-20 md:pt-40 pb-20 bg-zinc-900 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold font-heading text-white">
            {post.title}
          </h2>
          <div className="inline-flex pt-14 mb-14 items-center">
            <img
              className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
              src={detectImage(post.author.image)}
              alt=""
            />
            <div className="text-left">
              <h4 className="mb-1 text-2xl font-bold font-heading text-white">
                {post.author.username}
              </h4>
              <p className="text-gray-500">14 June, 5:00 am</p>
            </div>
          </div>

          <div className="mb-16">
            {post.tags.length ? (
              <div className="mt-6 ">
                {post.tags.map((tag) => (
                  <Tag key={tag.id} name={tag.name} size="px-8" />
                ))}
              </div>
            ) : null}

            <div className="flex justify-center items-center mt-8">
              <div className="ml-2 text-orange-200">
                <CreatedAtSVG />
              </div>
              <div className="ml-2 text-orange-200">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        {post.titleImage ? (
          <div className="relative -mx-6 mb-20">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-80 w-full bg-blue-300"></div>
            <img
              className="relative w-full h-96 px-6 object-cover"
              src={post.titleImage}
              alt="Title Image"
            />
          </div>
        ) : null}

        <div
          className="max-w-3xl mx-auto light-content-tiny"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </article>
  );
};

import { detectImage } from "../detectImage";
import { CreatedAtSVG } from "../svgs/CreatedAtSVG";
import { TagBox } from "../../tags/components/TagBox";
import { CommentArea } from "../../comments/components/CommentArea";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PostViewDto } from "../../posts/types/post-view.dto";
import { Link } from "react-router-dom";

export const PostElement = ({ post }: { post: PostViewDto }) => {
  const { colors, theme } = useSelector((root: RootState) => root.app);

  return (
    <div
      className={`relative pt-20 md:pt-40 pb-20  overflow-x-hidden bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 ${
        theme === "dark" ? "bg-" + colors.zinc900 : "bg-" + colors.zinc50
      }`}
    >
      <div className="container px-4 max-w-3xl mx-auto">
        <div className=" text-center">
          <h2
            className={`text-6xl md:text-7xl font-bold font-heading break-words ${
              theme === "dark"
                ? "text-" + colors.zinc50
                : "text-" + colors.zinc900
            }`}
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
                className={`mb-1 text-2xl font-bold font-heading ${
                  theme === "dark"
                    ? "text-" + colors.zinc50
                    : "text-" + colors.zinc900
                }`}
              >
                {post.author.username}
              </Link>
              <p className="text-gray-500 mt-2">14 June, 5:00 am</p>
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

            <div className="flex justify-center items-center mt-8">
              <div
                className={`${
                  theme === "dark"
                    ? "text-" + colors.zinc50
                    : "text-" + colors.zinc900
                } ml-2`}
              >
                <CreatedAtSVG />
              </div>
              <div
                className={`${
                  theme === "dark"
                    ? "text-" + colors.zinc50
                    : "text-" + colors.zinc900
                } ml-2`}
              >
                {new Date(post.created_at).toLocaleDateString()}
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
          className={`${
            theme === "dark" ? "light-content-tiny" : "dark-content-tiny"
          }`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>

        <section id="comments">
          <CommentArea postID={post.id} />
        </section>
      </div>
    </div>
  );
};

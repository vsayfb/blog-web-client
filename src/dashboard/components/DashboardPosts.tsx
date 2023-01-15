import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { changePostStatus, getMyPosts, removePost } from "../../lib/api/post";
import { DeleteModal } from "../../lib/modals/DeleteModal";
import { DeleteSVG } from "../../lib/svgs/DeleteSVG";
import { UpdateSVG } from "../../lib/svgs/UpdateSVG";
import { TagBox } from "../../tags/components/TagBox";
import { Helmet } from "react-helmet";
import { PostViewDto } from "../../posts/types/post-view.dto";
import { TagViewDto } from "../../tags/types/tag-view.dto";

export type DashboardPost = PostViewDto & {
  tags: TagViewDto[];
  published: boolean;
};

export const DashboardPosts = () => {
  const [myPosts, setMyPosts] = useState<DashboardPost[]>([]);

  const [deleteModalAnswer, setDeleteModalAnswer] = useState<boolean>();

  const [deleteModalSubject, setDeleteModalSubject] = useState("");

  async function getPosts() {
    const posts = await getMyPosts();
    setMyPosts(posts.data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (deleteModalAnswer === false) setDeleteModalSubject("");

    if (deleteModalAnswer === true) remove(deleteModalSubject);

    return () => setDeleteModalAnswer(undefined);
  }, [deleteModalAnswer]);

  async function changeStatus(id: string) {
    const result = await changePostStatus(id);

    const newState = myPosts.map((post) => {
      if (post.id === result.data.id) {
        post.published = result.data.published;
      }
      return post;
    });

    setMyPosts(newState);
  }

  async function remove(id: string) {
    const removed = await removePost(id);
    setMyPosts(myPosts.filter((p) => p.id !== removed.id));
    setDeleteModalSubject("");
  }

  return (
    <div className=" mt-8 ">
      {deleteModalSubject ? (
        <DeleteModal
          section={
            myPosts.find((post) => post.id === deleteModalSubject)?.title ||
            "this"
          }
          setAnswer={setDeleteModalAnswer}
        />
      ) : null}
      <section className="py-8  ">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>

        <div className="container px-4 mx-auto overflow-hidden ">
          <img className="ml-11 w-1/2 sm:w-auto h-1 sm:h-auto" alt="" />
          <div className="mb-16 overflow-hidden rounded-5xl">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full overflow-hidden">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="">
                      <td className="p-0">
                        <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                          <span className="text-sm font-heading font-semibold uppercase">
                            Title
                          </span>
                        </div>
                      </td>
                      <td className="p-0">
                        <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                          <span className="text-sm font-heading font-semibold uppercase">
                            Last Update
                          </span>
                        </div>
                      </td>
                      <td className="p-0">
                        <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                          <span className="text-sm font-heading font-semibold uppercase">
                            Status
                          </span>
                        </div>
                      </td>
                      <td className="p-0">
                        <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                          <span className="text-sm font-heading font-semibold uppercase">
                            Tags
                          </span>
                        </div>
                      </td>
                      <td className="p-0">
                        <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                          <span className="text-sm font-heading font-semibold uppercase">
                            Action
                          </span>
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {myPosts.map((post) => (
                      <tr key={post.id}>
                        <td className="p-0">
                          <div className="flex items-center justify-start p-5 h-20 min-w-max  ">
                            {post.title_image ? (
                              <img
                                className="mr-5 w-6 h-6"
                                src={post.title_image}
                                alt=""
                              />
                            ) : null}
                            <div>
                              <Link
                                to={`/${
                                  post.published ? post.url : "post/" + post.id
                                }`}
                                className="font-heading font-medium"
                              >
                                {post.title}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="p-0">
                          <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                            <span className="text-darkBlueGray-400 font-heading">
                              {new Date(post.updated_at).toDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="p-0">
                          <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                            <span
                              onClick={() => changeStatus(post.id)}
                              className={`cursor-pointer py-1 px-3 text-sm text-black font-heading font-medium 
                              ${
                                post.published ? "bg-green-300" : "bg-red-300"
                              } rounded-full`}
                            >
                              {post.published ? "PUBLIC" : "PRIVATE"}
                            </span>
                          </div>
                        </td>
                        <td className="p-0">
                          <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                            <span className="text-darkBlueGray-400 font-heading">
                              {post.tags.length ? (
                                post.tags.map((tag) => (
                                  <TagBox key={tag.id} name={tag.name} />
                                ))
                              ) : (
                                <b>NO</b>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="p-0">
                          <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                            <Link to={"/update/" + post.id}>
                              <UpdateSVG />
                            </Link>

                            <div
                              className="ml-4"
                              onClick={() => setDeleteModalSubject(post.id)}
                            >
                              <DeleteSVG />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sendRequest } from "../../lib/sendRequest";
import { setError } from "../../lib/slices/appSlice";
import { DeleteSVG } from "../../lib/svgs/DeleteSVG";
import { PostViewDto } from "../../posts/types/post-view.dto";

export const DashboardBookmarks = () => {
  const dispatch = useDispatch();

  const [bookmarks, setBookmarks] = useState<
    {
      id: string;
      created_at: string;
      post: PostViewDto;
    }[]
  >([]);

  async function getBookmarks() {
    const result = await sendRequest("bookmarks/me", "get", true);

    return result;
  }

  async function deleteBookmark(bookmarkID: string) {
    try {
      const result = await sendRequest(
        "bookmarks/" + bookmarkID,
        "delete",
        true
      );

      const newState = bookmarks.filter((b) => b.id !== result.id);

      setBookmarks(newState);
    } catch (error: any) {
      dispatch(setError(error.response.data.message));
    }
  }

  useEffect(() => {
    getBookmarks().then((b) => {
      setBookmarks(b.data);
    });
  }, []);

  return (
    <div className="overflow-hidden rounded-5xl mt-18">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden">
          {!bookmarks.length ? (
            <h1 className="text-2xl mt-16 " style={{ marginLeft: "1rem" }}>
              No bookmarks.
            </h1>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="">
                  <td className="p-0">
                    <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                      <span className="text-sm font-heading font-semibold uppercase">
                        Post
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                      <span className="text-sm font-heading font-semibold uppercase">
                        Added
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
                {bookmarks.map((b) => (
                  <tr key={b.id}>
                    <td className="p-0">
                      <div className="flex items-center justify-start p-5 h-20 min-w-max  ">
                        <div>
                          <Link
                            to={`/${b.post.url}`}
                            className="font-heading font-medium"
                          >
                            {b.post.title}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                        <span className="text-darkBlueGray-400 font-heading">
                          {moment(b.created_at).fromNow()}
                        </span>
                      </div>
                    </td>

                    <td className="p-0">
                      <div className="flex items-center justify-center p-5 h-20 min-w-max  ">
                        <div
                          className="ml-4"
                          onClick={() => deleteBookmark(b.id)}
                        >
                          <DeleteSVG />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { sendRequest } from "../../lib/sendRequest";
import { updateCommentInTree } from "../slices/commentsSlice";
import { CommentEditor } from "./CommentEditor";

export type UpdatedCommentDto = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: AccountViewDto;
  post: {
    id: "84116cd6-632e-467f-ab5b-66d306fa3fac";
    title: "This is my first post";
    title_image: null;
    url: "this-is-my-first-post-xRZsYx";
    content: "<p>Hello bremın bi&ccedil;agasu</p>";
    published: true;
    created_at: "2022-11-28T03:02:24.720Z";
    updated_at: "2022-11-29T05:17:08.713Z";
  };
};

export const UpdateComment = ({
  commentID,
  oldContent,
  setEditorVisibility,
}: {
  commentID: string;
  oldContent: string;
  setEditorVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  const [newContent, setNewContent] = useState(oldContent);

  async function update() {
    const { data }: { data: UpdatedCommentDto } = await sendRequest(
      `comments/${commentID}`,
      "patch",
      true,
      {
        content: newContent,
      }
    );

    dispatch(
      updateCommentInTree({
        id: data.id,
        content: data.content,
        created_at: data.created_at,
        updated_at: data.updated_at,
      })
    );

    setEditorVisibility(false);
  }

  return (
    <div className="pb-8 dark-content-tiny">
      <CommentEditor
        getEditorContent={(c) => setNewContent(c)}
        content={newContent}
      />

      <button
        className="bg-zinc-900 text-zinc-200 px-3 py-2 rounded-md mt-4 text-sm font-semibold"
        style={{ color: "white" }}
        onClick={update}
      >
        Update
      </button>
    </div>
  );
};

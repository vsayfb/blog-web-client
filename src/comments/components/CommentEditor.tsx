import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import imagesUploadHandler from "../../lib/imagesUploadHandler";

export const CommentEditor = ({
  content,
  getEditorContent,
}: {
  content?: string;
  getEditorContent: (content: string) => void;
}) => {
  return (
    <div className="">
      <TinyMCE
        value={content}
        tinymceScriptSrc={
          process.env.PUBLIC_URL + "/tinymce/js/tinymce/tinymce.min.js"
        }
        onEditorChange={getEditorContent}
        init={{
          height: 200,
          images_upload_handler: imagesUploadHandler,
          plugins:
            "autolink directionality code image link media codesample pagebreak nonbreaking anchor advlist lists help emoticons",
          menubar: false,
          toolbar:
            "undo redo | bold italic underline strikethrough | image link codesample blockquote quickimage | bullist | align fontselect fontsizeselect formatselect outdent indent | removeformat emoticons",
        }}
      />
    </div>
  );
};

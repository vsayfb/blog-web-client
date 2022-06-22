import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import imagesUploadHandler from "../imagesUploadHandler";

export const Editor = ({
  content,
  getEditorContent,
}: {
  content?: string;
  getEditorContent: (content: string) => void;
}) => {
  return (
    <div className="border border-black">
      <TinyMCE
        value={content}
        tinymceScriptSrc={
          process.env.PUBLIC_URL + "/tinymce/js/tinymce/tinymce.min.js"
        }
        onEditorChange={getEditorContent}
        init={{
          images_upload_handler: imagesUploadHandler,
          plugins:
            "preview autolink directionality code fullscreen image link media codesample table pagebreak nonbreaking anchor advlist lists help emoticons",
          menubar: false,
          toolbar:
            "undo redo | bold italic underline strikethrough | h2 h3 h4 | image link codesample blockquote quickimage | bullist numlist | align fontselect fontsizeselect formatselect outdent indent | preview fullscreen forecolor backcolor removeformat emoticons",
        }}
      />
    </div>
  );
};

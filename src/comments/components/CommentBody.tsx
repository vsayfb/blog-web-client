import { useEffect } from "react";
import Prism from "prismjs";

export const CommentBody = ({ content }: { content: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div
      className="pb-8 dark-content-tiny"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

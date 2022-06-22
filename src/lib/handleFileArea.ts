export const handleFileArea = (cb: Function) => {
  const input = document.createElement("input");

  input.type = "file";

  //@ts-ignore
  input.onchange = (e) => cb(e.target.files);

  input.click();
};

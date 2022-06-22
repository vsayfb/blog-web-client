export default (blobInfo: any, progress: any): any =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dmrziugzr/image/upload");

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({
          message: "HTTP Error: " + xhr.status,
          remove: true,
        });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject("HTTP Error: " + xhr.status);
        return;
      }

      const result = JSON.parse(xhr.response);

      if (!result || typeof result.secure_url != "string") {
        reject("Invalid JSON: " + result.secure_url);
        return;
      }

      resolve(result.secure_url);
    };

    xhr.onerror = () => {
      reject(
        "Image upload failed due to a XHR Transport error. Code: " + xhr.status
      );
    };

    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    formData.append("upload_preset", "odlwxryt");

    xhr.send(formData);
  });

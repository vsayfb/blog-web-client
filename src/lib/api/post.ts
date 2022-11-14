import { PostViewDto } from "../../posts/types/post-view.dto";
import { CreatePostDto } from "../../screens/WritePost";
import { sendRequest } from "../sendRequest";

export const BASE_PARAM = "posts/";

export async function getPublicPost(
  postUrl: string
): Promise<{ data: PostViewDto }> {
  return await sendRequest(BASE_PARAM + postUrl, "get", false, {});
}

export async function getPosts(): Promise<{ data: PostViewDto[] }> {
  return await sendRequest(BASE_PARAM, "get", false);
}

export async function uploadPost(
  data: CreatePostDto,
  published: boolean
): Promise<{ data: PostViewDto }> {
  const query = `${BASE_PARAM}${!published ? "?published=false" : ""}`;

  if (data.title_image) {
    const formData = new FormData();

    formData.set("titleImage", data.title_image);
    formData.set("title", data.title);
    formData.set("tags", JSON.stringify(data.tags));
    formData.set("content", data.content);

    return await sendRequest(query, "post", true, formData);
  } else {
    return await sendRequest(query, "post", true, data);
  }
}

export async function updatePost(
  id: string,
  data: any
): Promise<{ data: PostViewDto }> {



  
  return await sendRequest(BASE_PARAM + id, "patch", true, data);
}

export async function uploadTitleImageForPost(
  titleImage: Blob
): Promise<string> {
  const formData = new FormData();

  formData.set("titleImage", titleImage);

  return await sendRequest(
    BASE_PARAM + "upload_title_image",
    "post",
    true,
    formData
  );
}

export async function getMyPosts(): Promise<{ data: PostViewDto[] }> {
  return await sendRequest(BASE_PARAM + "me", "get", true);
}

export async function changePostStatus(
  postID: string
): Promise<{ data: { id: string; published: boolean } }> {
  return await sendRequest(
    BASE_PARAM + "change_post_status/" + postID,
    "put",
    true
  );
}

export async function removePost(
  id: string
): Promise<{ message: string; id: string }> {
  return await sendRequest(BASE_PARAM + id, "delete", true);
}

export async function getPost(id: string): Promise<{ data: PostViewDto }> {
  const query = "id/" + id;

  return await sendRequest(BASE_PARAM + query, "get", true);
}

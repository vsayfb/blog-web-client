import { CreatePostDto } from "../../screens/WritePost";
import { sendRequest } from "../sendRequest";
import { PostViewDto } from "../types/post";

export const BASE_PARAM = "posts/";

export async function getAPost(postUrl: string): Promise<PostViewDto> {
  return await sendRequest(BASE_PARAM + postUrl, "get", false, {});
}

export async function uploadPost(
  data: CreatePostDto,
  published: boolean
): Promise<PostViewDto> {
  const query = `${BASE_PARAM}${!published ? "?published=false" : ""}`;

  return await sendRequest(query, "post", true, data);
}

export async function updatePost(id: string, data: any): Promise<PostViewDto> {
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

export async function getMyPosts() {
  return await sendRequest(BASE_PARAM + "me", "get", true);
}

export async function changePostStatus(
  postID: string
): Promise<{ id: string; published: boolean }> {
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

export async function getPost(id: string): Promise<PostViewDto> {
  const query = "id?id=" + id;

  return await sendRequest(BASE_PARAM + query, "get", true);
}

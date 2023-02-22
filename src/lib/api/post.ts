import { DashboardPost } from "../../dashboard/components/DashboardPosts";
import { AllPostViewDto } from "../../posts/types/all-post-view.dto";
import { PostViewDto, UpdatedPostDto } from "../../posts/types/post-view.dto";
import { CreatePostDto } from "../../screens/WritePost";
import { sendRequest } from "../sendRequest";

export const BASE_PARAM = "posts/";

export async function getPublicPost(
  postUrl: string
): Promise<{ data: PostViewDto }> {
  return await sendRequest(BASE_PARAM + "url/" + postUrl, "get", true);
}

export async function getPosts(): Promise<{ data: AllPostViewDto }> {
  return await sendRequest(BASE_PARAM, "get", false);
}

export async function uploadPost(
  data: CreatePostDto,
  published: boolean
): Promise<{ data: UpdatedPostDto }> {
  const query = `${BASE_PARAM}${!published ? "?publish=false" : ""}`;

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
): Promise<{ data: UpdatedPostDto }> {
  return await sendRequest(BASE_PARAM + id, "put", true, data);
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

export async function getMyPosts(): Promise<{ data: DashboardPost[] }> {
  return await sendRequest(BASE_PARAM + "me", "get", true);
}

export async function changePostStatus(
  postID: string
): Promise<{ data: { id: string; published: boolean } }> {
  return await sendRequest(
    BASE_PARAM + "change_post_status/" + postID,
    "patch",
    true
  );
}

export async function removePost(
  id: string
): Promise<{ message: string; id: string }> {
  return await sendRequest(BASE_PARAM + id, "delete", true);
}

export async function getPost(
  id: string
): Promise<{ data: PostViewDto & { tags: [] } }> {
  const query = id;

  const res = await sendRequest(BASE_PARAM + query, "get", true);

  const tags = await sendRequest("tags/post/" + id, "get", false);

  res.data.tags = tags;

  return res;
}

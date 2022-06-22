import { sendRequest } from "../sendRequest";

export const BASE_PARAM = "accounts/";

export async function getMyCredentials(): Promise<any> {
  return await sendRequest(BASE_PARAM + "me", "get", true);
}

export async function uploadProfileImage(
  formData: FormData
): Promise<{ newImage: string }> {
  return await sendRequest(
    BASE_PARAM + "upload_profile_image",
    "post",
    true,
    formData
  );
}

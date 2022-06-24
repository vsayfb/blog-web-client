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

export async function isAvailableField(
  field: "username" | "email",
  value: string
): Promise<boolean> {
  const query = "is_available_" + field + "?" + field + "=" + value;

  return await sendRequest(BASE_PARAM + query, "get", false);
}

export async function beginAccountVerification(
  email: string,
  username: string
): Promise<{ message: string }> {
  return await sendRequest(BASE_PARAM + "begin_verification", "post", false, {
    email,
    username,
  });
}

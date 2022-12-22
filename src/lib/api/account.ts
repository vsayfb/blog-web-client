import { sendRequest } from "../sendRequest";

export const BASE_PARAM = "accounts/";

export async function getMyCredentials(): Promise<any> {
  return await sendRequest("auth/" + "me", "get", true);
}

export async function uploadProfileImage(
  formData: FormData
): Promise<{ data: string }> {
  return await sendRequest(
    BASE_PARAM + "upload_profile_image",
    "patch",
    true,
    formData
  );
}

export async function isAvailableField(
  field: "username" | "email",
  value: string
): Promise<boolean> {
  const query = "is_available_" + field + "?" + field + "=" + value;

  const { data } = await sendRequest(BASE_PARAM + query, "get", false);

  return data;
}

export async function beginAccountVerification(
  emailOrPhone: string,
  username: string,
  via: "email" | "phone"
): Promise<{ message: string }> {
  if (via === "email") {
    return await sendRequest("auth/begin_email_verification_for_register/", "post", false, {
      email: emailOrPhone,
      username,
    });
  }

  return await sendRequest(
    "auth//begin_mobile_phone_verification_for_register/",
    "post",
    false,
    {
      phone: emailOrPhone,
      username,
    }
  );
}

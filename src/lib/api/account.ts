import { LocalRegisterDto } from "../../auth/slices/authSlice";
import { UpdatedProfileDto } from "../../settings/components/profile/UpdatePublicProfile";
import { sendRequest } from "../sendRequest";

export const BASE_PARAM = "accounts/";

export async function getMyCredentials(): Promise<any> {
  return await sendRequest("auth/" + "me", "get", true);
}

export async function uploadProfileImage(
  formData: FormData,
  userID: string
): Promise<UpdatedProfileDto> {
  const result: UpdatedProfileDto = await sendRequest(
    "profiles/update_image/account/" + userID,
    "patch",
    true,
    formData
  );

  return result;
}

export async function isAvailableField(
  field: "username" | "email",
  value: string
): Promise<boolean> {
  const query = "is_available_" + field + "?" + field + "=" + value;

  const { data } = await sendRequest(BASE_PARAM + query, "get", false);

  return data;
}

export async function beginRegister(
  data: LocalRegisterDto,
  via: "email" | "phone"
): Promise<{ following_url: string; message: string }> {
  const { password, displayName, username } = data;

  if (via === "email") {
    return await sendRequest("local/auth/register_with_email/", "post", false, {
      display_name: displayName,
      email: data.email,
      username,
      password,
    });
  }

  return await sendRequest(
    "local/auth/register_with_mobile_phone/",
    "post",
    false,
    {
      display_name: displayName,
      mobile_phone: data.mobile_phone,
      username,
      password,
    }
  );
}

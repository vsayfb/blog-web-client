import { sendRequest } from "../sendRequest";
import { GoogleResponseData } from "../../auth/google/ViaGoogle";
import { AccountViewDto } from "../../accounts/types/account-view-dto";

export const BASE_PARAM = "auth/";

export async function localLogin(
  usernameOrEmailOrMobilePhone: string,
  password: string
): Promise<{
  data?: { account: AccountViewDto; access_token: string };
  following_link?: string;
  message: string;
}> {
  const result: {
    data?: { account: AccountViewDto; access_token: string };
    following_link?: string;
    message: string;
  } = await sendRequest("local/auth/login", "post", false, {
    username: usernameOrEmailOrMobilePhone,
    password,
  });

  return result;
}

export async function googleLogin(
  access_token: string
): Promise<{
  data?: { account: AccountViewDto; access_token: string } | undefined;
  following_link?: string | undefined;
  message: string;
}> {
  const result: {
    data?: GoogleResponseData["data"];
    following_link?: string;
    message: string;
  } = await sendRequest(
    "google/auth/login",
    "post",
    false,
    {},
    {
      Authorization: access_token,
    }
  );

  return result;
}

export async function googleRegister(
  google_access_token: string
): Promise<GoogleResponseData> {
  return await sendRequest("google/auth/register", "post", false, {
    google_access_token,
  });
}

type RegisterDto = GoogleResponseData;

export async function register(
  verificationToken: string,
  verificationCode: string
): Promise<RegisterDto> {
  return await sendRequest(verificationToken.substring(1), "post", false, {
    verification_code: verificationCode,
  });
}

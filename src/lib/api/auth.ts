import { CreateAccoundDto } from "../../auth/via/ViaEmail";
import { sendRequest } from "../sendRequest";
import { Auth } from "../../auth/types/auth-view.dto";
import { GoogleResponseData } from "../../auth/via/ViaGoogle";
import { AccountViewDto } from "../../accounts/types/account-view-dto";

export const BASE_PARAM = "auth/";

export async function localLogin(
  usernameOrEmail: string,
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
  } = await sendRequest(BASE_PARAM + "login", "post", false, {
    username: usernameOrEmail,
    password,
  });

  return result;
}

export async function googleLogin(
  access_token: string
): Promise<GoogleResponseData> {
  return await sendRequest(
    BASE_PARAM + "google/login",
    "post",
    false,
    {},
    {
      Authorization: access_token,
    }
  );
}

export async function googleRegister(
  access_token: string
): Promise<GoogleResponseData> {
  return await sendRequest(BASE_PARAM + "google/register", "post", false, {
    access_token,
  });
}

type RegisterDto = GoogleResponseData;

export async function register(
  dto: CreateAccoundDto,
  via: "phone" | "email"
): Promise<RegisterDto> {
  if (via === "email") {
    //@ts-ignore
    delete dto.phone;

    return await sendRequest(
      BASE_PARAM + "register_with_email",
      "post",
      false,
      dto
    );
  }

  //@ts-ignore
  delete dto.email;

  return await sendRequest(
    BASE_PARAM + "register_with_mobile_phone",
    "post",
    false,
    dto
  );
}

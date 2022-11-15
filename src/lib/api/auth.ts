import { CreateAccoundDto } from "../../auth/via/ViaLocal";
import { sendRequest } from "../sendRequest";
import { Auth } from "../../auth/types/auth-view.dto";
import { GoogleResponseData } from "../../auth/via/ViaGoogle";

export const BASE_PARAM = "auth/";

export async function localLogin(
  usernameOrEmail: string,
  password: string
): Promise<{ access_token: string }> {
  const result: { data: { access_token: string; message: string } } =
    await sendRequest(BASE_PARAM + "login", "post", false, {
      username: usernameOrEmail,
      password,
    });

  return { access_token: "Bearer " + result.data.access_token };
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

export async function register(dto: CreateAccoundDto): Promise<RegisterDto> {
  return await sendRequest(BASE_PARAM + "register", "post", false, dto);
}

import { CreateAccoundDto } from "../../auth/via/ViaLocal";
import { sendRequest } from "../sendRequest";
import { Auth } from "../types/post";

export const BASE_PARAM = "auth/";

export async function localLogin(
  usernameOrEmail: string,
  password: string
): Promise<{ access_token: string }> {
  const data = await sendRequest(BASE_PARAM + "login", "post", false, {
    username: usernameOrEmail,
    password,
  });

  return data.access_token;
}



export async function googleAuth(access_token: string): Promise<Auth> {
  return await sendRequest(BASE_PARAM + "google", "post", false, {
    access_token,
  });
}

export async function register(dto: CreateAccoundDto): Promise<Auth> {
  return await sendRequest(BASE_PARAM + "register", "post", false, dto);
}

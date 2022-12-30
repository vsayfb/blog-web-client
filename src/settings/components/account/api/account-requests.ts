import { sendRequest } from "../../../../lib/sendRequest";
import { RegisteredVia } from "../Account";

export async function addEmailToAccount(
  via: RegisteredVia,
  email: string,
  password: string
): Promise<{ following_link: string; message: string }> {
  const result: { following_link: string; message: string } = await sendRequest(
    `accounts/${via}/credentials/add_email`,
    "post",
    true,
    { email, password }
  );

  return { ...result, following_link: result.following_link };
}

export async function removeEmail(
  via: RegisteredVia,
  password: string
): Promise<{ following_link: string; message: string }> {
  const result: { following_link: string; message: string } = await sendRequest(
    `accounts/${via}/credentials/remove_email`,
    "post",
    true,
    { password }
  );

  return { ...result, following_link: result.following_link };
}

export async function addMobilePhoneToAccount(
  via: RegisteredVia,
  phone: string,
  password: string
): Promise<{ following_link: string; message: string }> {
  const result: { following_link: string; message: string } = await sendRequest(
    `accounts/${via}/credentials/add_mobile_phone`,
    "post",
    true,
    { mobile_phone: phone, password }
  );

  return { ...result, following_link: result.following_link };
}

export async function removeMobilePhone(
  via: RegisteredVia,
  password: string
): Promise<{ following_link: string; message: string }> {
  const result: { following_link: string; message: string } = await sendRequest(
    `accounts/${via}/credentials/remove_mobile_phone`,
    "post",
    true,
    { password }
  );

  return { ...result, following_link: result.following_link };
}

import { dbReadAuthenticatorsByUserId, dbReadLoggedInUserInfoBySession } from "~/server/db/user";
import { resMessageError, resMessageSuccess } from "~/server/message";

export const fetchLoggedUserInfo = async (sessionId: string) => {
  let userInfo;
  try {
    userInfo = await dbReadLoggedInUserInfoBySession(sessionId);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  return resMessageSuccess("DB_READ_SUCCEED", userInfo)
};

export const fetchUserDevice = async (userId: string) => {
  let authenticators;
  try {
    authenticators = await dbReadAuthenticatorsByUserId(userId);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  return resMessageSuccess("DB_READ_SUCCEED", authenticators)
}

export interface aaguid {
  name: string,
  icon_dark: string,
  icon_light: string,
}
export const fetchAaguid = async () => {
  try {
    const aaguid = (await (
      await fetch(
        "https://raw.githubusercontent.com/passkeydeveloper/passkey-authenticator-aaguids/main/aaguid.json",
      )
    ).json()) as Record<string, aaguid>;
    return resMessageSuccess("FETCH_SUCCESS", aaguid)
  } catch(e) {
    console.error(e);
    return resMessageError('FETCH_AAGUID_LIST_ERROR');
  }
}
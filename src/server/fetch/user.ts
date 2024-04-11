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
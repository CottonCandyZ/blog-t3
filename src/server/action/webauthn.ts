"use server"
import { cookies } from "next/headers";
import { resMessageError, resMessageSuccess } from "~/server/message";
import z from "zod";
import crypto from "crypto";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { ERROR_MESSAGE, SUCCEED_MESSAGE } from "~/server/message";
import { revalidatePath } from "next/cache";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import type {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import {
  dbCreateAuthSession,
  dbCreateAuthenticatorForUser,
  dbCreateSession,
  dbCreateUser,
  dbReadAuthSessionData,
  dbReadAuthenticatorById,
  dbReadAuthenticatorsByUserId,
  dbReadLoggedInUserInfoBySession,
  dbRemoveAuthenticatorCounter,
  dbUpdateAuthenticatorCounter,
} from "~/server/db/user";

// Human-readable title for your website
const rpName = "Cotton Blog";
// A unique identifier for your website
const rpID = process.env.rpID!;
// The URL at which registrations and authentications should occur
const origin =
  process.env.NODE_ENV !== "production"
    ? `http://${rpID}:3000`
    : `https://${rpID}`;

// LOGOUT
export async function LogoutAction() {
  await Promise.resolve(cookies().delete("session-id"));
}

// REG
interface AuthenticatorInfoCreAndTrans {
  credentialID: string;
  createAt?: Date;
  transports?: string | null;
}

export interface AuthenticatorInfo extends AuthenticatorInfoCreAndTrans {
  credentialPublicKey: string;
  counter: number;
}

async function getCurrentAuthSession() {
  const sessionId = cookies().get("auth-session-id")?.value;
  if (!sessionId) {
    return resMessageError("AUTH_SESSION_NOT_FOND");
  }
  let currentSession;
  try {
    currentSession = await dbReadAuthSessionData(sessionId);
  } catch (e) {
    console.log(e);
    return resMessageError("DB_ERROR");
  }
  if (!currentSession) {
    return resMessageError("AUTH_SESSION_EXPIRE");
  }
  return currentSession;
}

async function generateRegistrationOpt(
  userName: string,
  userId?: string,
  userAuthenticators?: AuthenticatorInfoCreAndTrans[],
) {
  if (!userId) {
    userId = crypto.randomUUID();
  }
  let options;
  try {
    options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: userId,
      userName: userName,
      excludeCredentials: userAuthenticators?.map((authenticator) => ({
        id: isoBase64URL.toBuffer(authenticator.credentialID),
        type: "public-key",
        // Optional
        transports: authenticator.transports
          ? (JSON.parse(
              authenticator.transports,
            ) as AuthenticatorTransportFuture[])
          : undefined,
      })),
      authenticatorSelection: {
        // Defaults
        residentKey: "preferred",
        userVerification: "preferred",
      },
    });
  } catch (e) {
    console.error(e);
    return resMessageError("GENERATE_REG_OPTIONS_FAILED");
  }
  let session;
  try {
    session = await dbCreateAuthSession(options.challenge, userId, userName);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  cookies().set("auth-session-id", session.id);
  return resMessageSuccess("OPTION_GENERATE", options);
}

export async function RegOptAction(formData: FormData) {
  const schema = z.object({
    userName: z.string(),
  });
  let data;
  try {
    data = schema.parse({
      userName: formData.get("username"),
    });
  } catch {
    return resMessageError("ZOD_FORM_DATA_TYPE_ERROR");
  }
  if (data.userName == "") {
    return resMessageError("USER_ID_CAN_NOT_BE_EMPTY");
  }
  return await generateRegistrationOpt(data.userName);
}

async function verifyRegistrationRes(
  localResponse: RegistrationResponseJSON,
  currentSession: {
    currentChallenge: string;
  },
) {
  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: localResponse,
      expectedChallenge: currentSession.currentChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false,
    });
  } catch (e) {
    console.error(e);
    return resMessageError("VERIFY_REG_RESPONSE_PROCESS_FAILED");
  }
  const { verified, registrationInfo } = verification;
  if (!verified || !registrationInfo) {
    return resMessageError("VERIFY_REG_RESPONSE_FAILED");
  }
  const { credentialPublicKey, credentialID, counter } = registrationInfo;
  const newAuthenticator = {
    credentialID: isoBase64URL.fromBuffer(credentialID),
    credentialPublicKey: isoBase64URL.fromBuffer(credentialPublicKey),
    counter,
    transports: JSON.stringify(localResponse.response.transports),
  };
  return newAuthenticator;
}

export async function vRegResAction(localResponse: RegistrationResponseJSON) {
  const currentSession = await getCurrentAuthSession()
  if ("message" in currentSession) {
    return currentSession;
  }
  const newAuthenticator = await verifyRegistrationRes(localResponse, currentSession);
  if ("message" in newAuthenticator) {
    return newAuthenticator;
  }
  let user;
  try {
    user = await dbCreateUser(
      currentSession.userId!,
      currentSession.userName!,
      newAuthenticator,
    );
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  try {
    cookies().delete("auth-session-id");
    const session = await dbCreateSession(user.id);
    cookies().set("session-id", session.id);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  return resMessageSuccess("REGISTER_FINISH");
}

// Auth
export async function AuthOptAction() {
  let options;
  try {
    options = await generateAuthenticationOptions({
      rpID,
    });
  } catch (e) {
    console.error(e);
    return resMessageError("GENERATE_AUTH_OPTIONS_FAILED");
  }
  let session;
  try {
    session = await dbCreateAuthSession(options.challenge);
  } catch (e) {
    console.error(e);
    return resMessageError("GENERATE_NEW_AUTH_SESSION_FAILED");
  }
  cookies().set("auth-session-id", session.id);
  return resMessageSuccess("OPTION_GENERATE", options);
}

export async function vAuthResAction(options: AuthenticationResponseJSON) {
  const currentSession = await getCurrentAuthSession()
  if ("message" in currentSession) {
    return currentSession;
  }

  let authenticator;
  try {
    authenticator = await dbReadAuthenticatorById(options.rawId);
  } catch (e) {
    return resMessageError("DB_ERROR");
  }

  if (!authenticator) {
    return resMessageError("AUTHENTICATOR_NOT_FOUND");
  }

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: options,
      expectedChallenge: currentSession.currentChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        ...authenticator,
        credentialID: isoBase64URL.toBuffer(authenticator.credentialID),
        credentialPublicKey: isoBase64URL.toBuffer(
          authenticator.credentialPublicKey,
        ),
        transports: authenticator.transports
          ? (JSON.parse(
              authenticator.transports,
            ) as AuthenticatorTransportFuture[])
          : undefined,
      },
    });
  } catch (e) {
    console.error(e);
    return resMessageError("VERIFY_AUTH_RESPONSE_PROCESS_FAILED");
  }
  if (!verification.verified) {
    return resMessageError("VERIFY_AUTH_RESPONSE_FAILED");
  }
  try {
    await dbUpdateAuthenticatorCounter(
      authenticator.credentialID,
      verification.authenticationInfo.newCounter,
    );
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }

  try {
    cookies().delete("auth-session-id");
    const session = await dbCreateSession(authenticator.userId);
    cookies().set("session-id", session.id);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }

  return resMessageSuccess("AUTH_FINISH");
}

// ADD DEVICE

export async function addDeviceOptAction() {
  // SESSION CHECK
  const sessionId = cookies().get("session-id")?.value;
  if (!sessionId) {
    return resMessageError("SESSION_NOT_FOUND");
  }

  // USER CHECK
  let userInfo;
  try {
    userInfo = await dbReadLoggedInUserInfoBySession(sessionId);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  if (!userInfo) {
    return resMessageError("SESSION_EXPIRE");
  }
  let authenticators;
  try {
    authenticators = await dbReadAuthenticatorsByUserId(userInfo.id);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  if (!authenticators) {
    return resMessageError("NO_DEVICE_REGISTER_BEFORE");
  }
  return await generateRegistrationOpt(
    userInfo.name,
    userInfo.id,
    authenticators,
  );
}

export async function addDeviceVResAction(localResponse: RegistrationResponseJSON) {
  const currentSession = await getCurrentAuthSession()
  if ("message" in currentSession) {
    return currentSession;
  }

  const newAuthenticator = await verifyRegistrationRes(localResponse, currentSession);

  if ("message" in newAuthenticator) {
    return newAuthenticator;
  }

  try {
    await dbCreateAuthenticatorForUser(currentSession.userId!, newAuthenticator);
  } catch (e) {
    console.error(e);
    return resMessageError("DB_ERROR");
  }
  revalidatePath("/posts/[slug]", "page");
  revalidatePath("/about");
  return resMessageSuccess("ADD_DEVICE_SUCCEED");
}

export async function removeUserDeviceAction(credentialID: string) {
    // SESSION CHECK
    const sessionId = cookies().get("session-id")?.value;
    if (!sessionId) {
      return resMessageError("SESSION_NOT_FOUND");
    }
  
    // USER CHECK
    let userInfo;
    try {
      userInfo = await dbReadLoggedInUserInfoBySession(sessionId);
    } catch (e) {
      console.error(e);
      return resMessageError("DB_ERROR");
    }
    if (!userInfo) {
      return resMessageError("SESSION_EXPIRE");
    }
    let authenticators;
    try {
      authenticators = await dbReadAuthenticatorsByUserId(userInfo.id);
    } catch (e) {
      console.error(e);
      return resMessageError("DB_ERROR");
    }
  if (authenticators.length == 1)
    return resMessageError("ONLY_ONE_DEVICE_REMAIN");
  try {
    await dbRemoveAuthenticatorCounter(userInfo.id, credentialID)
    revalidatePath("/posts/[slug]", "page");
    revalidatePath("/about");
    return { message: SUCCEED_MESSAGE.REMOVE_DEVICE_SUCCEED };
  } catch (e) {
    return { message: ERROR_MESSAGE.REMOVE_DEVICE_SQL_ERROR };
  }
}
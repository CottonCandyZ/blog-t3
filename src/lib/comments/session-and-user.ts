"use server";
import { cookies } from "next/headers";
import prisma from "~/server/db";
import z from "zod";

import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import type {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import { ERROR_MESSAGE, SUCCEED_MESSAGE } from "~/lib/comments/message";

// Human-readable title for your website
const rpName = "Cotton Blog";
// A unique identifier for your website
const rpID = process.env.rpID!;
// The URL at which registrations and authentications should occur
const origin =
  process.env.NODE_ENV !== "production"
    ? `http://${rpID}:3000`
    : `https://${rpID}`;
    
export async function Logout() {
  await Promise.resolve(cookies().delete("session-id"));
}

async function newSession(userId: string) {
  return await prisma.session.create({
    data: {
      userId: userId,
    },
  });
}
export async function getLoggedInUserInfo() {
  const sessionId = cookies().get("session-id")?.value;
  if (!sessionId) return null;
  return await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
async function getAuthSessionData(sessionId: string) {
  return await prisma.authSession.findUnique({
    where: {
      id: sessionId,
    },
  });
}
async function newAuthSession(
  userId: string,
  currentChallenge: string,
  userName?: string,
) {
  return prisma.authSession.create({
    data: {
      userId: userId,
      userName: userName,
      currentChallenge: currentChallenge,
    },
  });
}
async function getCurrentAuthSession() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session-id");
  if (sessionId?.value) {
    const session = await getAuthSessionData(sessionId.value);
    return session;
  }
  return null;
}

async function getUserAuthenticators(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      device: {
        select: {
          credentialID: true,
        },
      },
    },
  });
}
async function getUserAuthenticator(userId: string, credentialID: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
      device: {
        some: {
          credentialID: credentialID,
        },
      },
    },
    select: {
      id: true,
      device: {
        select: {
          counter: true,
          credentialID: true,
          credentialPublicKey: true,
          transports: true,
        },
      },
    },
  });
}
async function UpdateAuthenticator(
  userId: string,
  credentialID: string,
  counter: number,
) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      device: {
        update: {
          where: {
            credentialID: credentialID,
          },
          data: {
            counter: counter,
          },
        },
      },
    },
  });
}

async function findUser(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function newUser(userId: string, userName: string) {
  return await prisma.user.create({
    data: {
      id: userId,
      name: userName,
    },
  });
}
// Uer END

// Reg
export async function generateRegistrationOpt(formData: FormData) {
  const schema = z.object({
    userId: z.string(),
    userName: z.string(),
  });
  const data = schema.parse({
    userId: formData.get("userId"),
    userName: formData.get("userName"),
  });
  if (data.userId == "") {
    return { message: ERROR_MESSAGE.USER_ID_CAN_NOT_BE_EMPTY };
  }
  if (data.userName == "") {
    data.userName = data.userId;
  }
  if (await findUser(data.userId)) {
    return { message: ERROR_MESSAGE.USER_ALREADY_EXIST };
  }
  let options;
  try {
    options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: data.userId,
      userName: data.userName,
      authenticatorSelection: {
        // Defaults
        residentKey: "preferred",
        userVerification: "preferred",
      },
    });
  } catch (e) {
    console.error(e);
    return { message: ERROR_MESSAGE.USER_ALREADY_EXIST };
  }
  let session;
  try {
    session = await newAuthSession(
      data.userId,
      options.challenge,
      data.userName,
    );
  } catch (e) {
    console.error(e);
    return { message: ERROR_MESSAGE.GENERATE_NEW_REG_SESSION_FAILED };
  }
  cookies().set("session-id", session.id);
  return { options, message: SUCCEED_MESSAGE.OPTION_GENERATE_SUCCEED };
}

export async function verifyRegistrationRes(
  localResponse: RegistrationResponseJSON,
) {
  const currentSession = await getCurrentAuthSession();
  if (!currentSession) {
    return { message: ERROR_MESSAGE.REG_SESSION_EXPIRE };
  }
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
    return {
      message: ERROR_MESSAGE.VERIFY_REG_RESPONSE_PROCESS_FAILED,
    };
  }
  const { verified, registrationInfo } = verification;
  if (!verified || !registrationInfo) {
    return { message: ERROR_MESSAGE.VERIFY_REG_RESPONSE_FAILED };
  }
  const { credentialPublicKey, credentialID, counter } = registrationInfo;
  const newAuthenticator = {
    credentialID: isoBase64URL.fromBuffer(credentialID),
    credentialPublicKey: isoBase64URL.fromBuffer(credentialPublicKey),
    counter,
    transports: JSON.stringify(localResponse.response.transports),
  };
  try {
    const user = await saveNewUserAuthenticatorInDB(
      currentSession.userId,
      currentSession.userName!,
      newAuthenticator,
    );
    const session = await newSession(user.id);
    cookies().set("session-id", session.id);
  } catch (e) {
    console.error(e);
    return { message: ERROR_MESSAGE.VERIFY_SAVE_UER_FAILED };
  }
  return { success: true, message: SUCCEED_MESSAGE.REGISTER_SUCCEED };
}

interface AuthenticatorInfo {
  credentialID: string;
  credentialPublicKey: string;
  counter: number;
  transports?: string;
}

async function saveNewUserAuthenticatorInDB(
  userId: string,
  userName: string,
  newAuthenticator: AuthenticatorInfo,
) {
  // 如果在这里出现重名的怎么办 是不是应该一开始就将它加进去 有任何失败再更新表？（这种情况很少见，暂时先这么写
  const user = await newUser(userId, userName);
  await prisma.device.create({
    data: {
      ...newAuthenticator,
      userId: user.id,
    },
  });
  return user;
}

// Auth
export async function generateAuthenticationOpt(formData: FormData) {
  const schema = z.object({
    userId: z.string(),
  });
  const data = schema.parse({
    userId: formData.get("userId"),
  });
  if (data.userId == "") {
    return { message: ERROR_MESSAGE.USER_ID_CAN_NOT_BE_EMPTY };
  }
  const user = await getUserAuthenticators(data.userId);
  if (!user) {
    return { message: ERROR_MESSAGE.USER_ID_NOT_EXIST };
  }
  let options;
  try {
    options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: user.device.map((dev) => ({
        id: isoBase64URL.toBuffer(dev.credentialID),
        type: "public-key",
      })),
    });
  } catch (e) {
    console.log(e);
    return { message: ERROR_MESSAGE.GENERATE_AUTH_OPTIONS_FAILED };
  }
  let session;
  try {
    session = await newAuthSession(data.userId, options.challenge);
  } catch (e) {
    console.error(e);
    return { message: ERROR_MESSAGE.GENERATE_NEW_AUTH_SESSION_FAILED };
  }
  cookies().set("session-id", session.id);
  return { options, message: SUCCEED_MESSAGE.OPTION_GENERATE_SUCCEED };
}

export async function verifyAuthenticationRes(
  options: AuthenticationResponseJSON,
) {
  const currentSession = await getCurrentAuthSession();
  if (!currentSession) {
    return { message: ERROR_MESSAGE.AUTH_SESSION_EXPIRE };
  }
  const authenticator = await getUserAuthenticator(
    currentSession.userId,
    options.rawId,
  );
  if (!authenticator) {
    return { message: ERROR_MESSAGE.USER_ID_NOT_EXIST_IN_VERIFY };
  }
  if (authenticator.device.length == 0)
    return { message: ERROR_MESSAGE.AUTHENTICATOR_NOT_FOUND };
  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: options,
      expectedChallenge: currentSession.currentChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        ...authenticator.device[0]!,
        credentialID: isoBase64URL.toBuffer(
          authenticator.device[0]!.credentialID,
        ),
        credentialPublicKey: isoBase64URL.toBuffer(
          authenticator.device[0]!.credentialPublicKey,
        ),
        transports: authenticator.device[0]!.transports
          ? (JSON.parse(
              authenticator.device[0]!.transports,
            ) as AuthenticatorTransportFuture[])
          : undefined,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: ERROR_MESSAGE.VERIFY_AUTH_RESPONSE_PROCESS_FAILED };
  }
  if (!verification.verified) {
    return { message: ERROR_MESSAGE.VERIFY_AUTH_RESPONSE_FAILED };
  }
  // await UpdateAuthenticator(
  //   authenticator.id,
  //   authenticator.device[0]!.credentialID,
  //   verification.authenticationInfo.newCounter,
  // );
  try {
    const session = await newSession(authenticator.id);
    cookies().set("session-id", session.id);
  } catch (e) {
    console.log(e);
    return { message: ERROR_MESSAGE.CREATE_NEW_SESSION_FAILED };
  }

  return { message: SUCCEED_MESSAGE.AUTH_SUCCEED, success: true };
}

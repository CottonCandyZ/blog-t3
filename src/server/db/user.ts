import { cache } from "react";
import type { AuthenticatorInfo } from "~/server/action/webauthn";
import prisma from "~/server/db";

// READ
export const dbReadLoggedInUserInfoBySession = cache(
  async (sessionId: string) => {
    return await prisma.session
      .findUnique({
        where: {
          id: sessionId,
        },
      })
      .user();
  },
);

export const dbReadAuthenticatorById = async (credentialID: string) => {
  return await prisma.device.findUnique({
    where: {
      credentialID: credentialID,
      removed: false,
    },
  });
};

export const dbReadAuthenticatorsByUserId = cache(async (userId: string) => {
  return await prisma.device.findMany({
    where: {
      userId: userId,
      removed: false,
    },
  });
});

export const dbReadAuthSessionData = async (sessionId: string) => {
  return await prisma.authSession.findUnique({
    where: {
      id: sessionId,
    },
  });
};

// CREATE
export const dbCreateAuthSession = async (
  currentChallenge: string,
  userId?: string,
  userName?: string,
) => {
  return await prisma.authSession.create({
    data: {
      userId: userId,
      userName: userName,
      currentChallenge: currentChallenge,
    },
  });
};

export const dbCreateUser = async (
  userId: string,
  userName: string,
  newAuthenticator: AuthenticatorInfo,
) => {
  return await prisma.user.create({
    data: {
      id: userId,
      name: userName,
      device: {
        create: {
          ...newAuthenticator,
        },
      },
    },
  });
};

export const dbCreateSession = async (userId: string) => {
  return await prisma.session.create({
    data: {
      userId: userId,
    },
  });
};

export const dbCreateAuthenticatorForUser = async (
  userId: string,
  newAuthenticator: AuthenticatorInfo,
) => {
  await prisma.device.create({
    data: {
      ...newAuthenticator,
      userId: userId,
    },
  });
};

// UPDATE
export const dbUpdateAuthenticatorCounter = async (
  credentialID: string,
  counter: number,
) => {
  return await prisma.device.update({
    where: {
      credentialID: credentialID,
    },
    data: {
      counter: counter,
    },
  });
};

// Remove
export const dbRemoveAuthenticatorCounter = async (
  userId: string,
  credentialID: string,
) => {
  return await prisma.device.update({
    where: {
      userId: userId,
      credentialID: credentialID,
    },
    data: {
      removed: true,
    },
  });
};

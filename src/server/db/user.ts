import { cache } from 'react'
import type { AuthenticatorInfo } from '~/server/action/webauthn'
import { getPrisma } from '~/server/db'

// READ
export const dbReadLoggedInUserInfoBySession = cache(async (sessionId: string) => {
  return await getPrisma()
    .session.findUnique({
      where: {
        id: sessionId,
      },
    })
    .user()
})

export async function dbReadAuthenticatorById(credentialID: string) {
  return await getPrisma().device.findUnique({
    where: {
      credentialID,
      removed: false,
    },
  })
}

export const dbReadAuthenticatorsByUserId = cache(async (userId: string) => {
  return await getPrisma().device.findMany({
    select: {
      createAt: true,
      credentialID: true,
      aaguid: true,
    },
    where: {
      userId,
      removed: false,
    },
  })
})

export async function dbReadAuthSessionData(sessionId: string) {
  return await getPrisma().authSession.findUnique({
    where: {
      id: sessionId,
    },
  })
}

// CREATE
export async function dbCreateAuthSession(
  currentChallenge: string,
  userId?: string,
  userName?: string,
) {
  return await getPrisma().authSession.create({
    data: {
      userId,
      userName,
      currentChallenge,
    },
  })
}

export async function dbCreateUser(
  userId: string,
  userName: string,
  newAuthenticator: AuthenticatorInfo,
) {
  return await getPrisma().user.create({
    data: {
      id: userId,
      name: userName,
      device: {
        create: {
          ...newAuthenticator,
        },
      },
    },
  })
}

export async function dbCreateSession(userId: string) {
  return await getPrisma().session.create({
    data: {
      userId,
    },
  })
}

export async function dbCreateAuthenticatorForUser(
  userId: string,
  newAuthenticator: AuthenticatorInfo,
) {
  await getPrisma().device.create({
    data: {
      ...newAuthenticator,
      userId,
    },
  })
}

// UPDATE
export async function dbUpdateAuthenticatorCounter(credentialID: string, counter: number) {
  return await getPrisma().device.update({
    where: {
      credentialID,
    },
    data: {
      counter,
    },
  })
}

// Remove
export async function dbRemoveAuthenticatorCounter(userId: string, credentialID: string) {
  return await getPrisma().device.update({
    where: {
      userId,
      credentialID,
    },
    data: {
      removed: true,
    },
  })
}

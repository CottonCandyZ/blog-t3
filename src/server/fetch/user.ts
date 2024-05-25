import { cookies } from 'next/headers'
import { dbReadAuthenticatorsByUserId, dbReadLoggedInUserInfoBySession } from '~/server/db/user'
import { resMessageError, resMessageSuccess } from '~/server/message'

export type DeviceInfoPromise = ReturnType<typeof fetchUserDevice>

export async function fetchLoggedUserInfo() {
  const sessionId = cookies().get('session-id')?.value
  if (!sessionId) return resMessageError('SESSION_EXPIRE')
  let userInfo
  try {
    userInfo = await dbReadLoggedInUserInfoBySession(sessionId)
  } catch (e) {
    console.error(e)
    return resMessageError('DB_ERROR')
  }
  return resMessageSuccess('DB_READ_SUCCEED', userInfo)
}

export async function fetchUserDevice() {
  const user = (await fetchLoggedUserInfo()).data
  if (!user) return resMessageError('SESSION_EXPIRE')
  let authenticators
  try {
    authenticators = await dbReadAuthenticatorsByUserId(user.id)
  } catch (e) {
    console.error(e)
    return resMessageError('DB_ERROR')
  }
  return resMessageSuccess('DB_READ_SUCCEED', authenticators)
}

export type AaguidPromise = ReturnType<typeof fetchAaguid>

export interface aaguid {
  name: string
  icon_dark: string
  icon_light: string
}
export async function fetchAaguid() {
  try {
    const aaguid = (await (
      await fetch(
        'https://raw.githubusercontent.com/passkeydeveloper/passkey-authenticator-aaguids/main/aaguid.json',
      )
    ).json()) as Record<string, aaguid>
    return resMessageSuccess('FETCH_SUCCESS', aaguid)
  } catch (e) {
    console.error(e)
    return resMessageError('FETCH_AAGUID_LIST_ERROR')
  }
}

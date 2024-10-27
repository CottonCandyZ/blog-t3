'use server'
import z from 'zod'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { dbReadLoggedInUserInfoBySession } from '~/server/db/user'
import { dbCreateNewComment } from '~/server/db/comments-list'
import { resMessageError, resMessageSuccess } from '~/server/message'

export async function createCommentAction(
  slug: string,
  prevState: { message: string },
  formData: FormData,
) {
  // DATA CHECK
  const schema = z.object({
    content: z.string(),
  })
  let data
  try {
    data = schema.parse({
      content: formData.get('content'),
    })
  } catch (e) {
    console.error(e)
    return resMessageError('ZOD_FORM_DATA_TYPE_ERROR')
  }
  if (data.content === '') return resMessageError('NEW_COMMENT_COMMENT_EMPTY')

  // SESSION CHECK
  const sessionId = (await cookies()).get('session-id')?.value
  if (!sessionId) return resMessageError('SESSION_NOT_FOUND')

  // USER CHECK
  let userInfo
  try {
    userInfo = await dbReadLoggedInUserInfoBySession(sessionId)
  } catch (e) {
    console.error(e)
    return resMessageError('DB_ERROR')
  }
  if (!userInfo) return resMessageError('SESSION_EXPIRE')

  // CREATE
  try {
    await dbCreateNewComment(data.content, slug, userInfo.id)
    revalidatePath('/posts/[slug]', 'page')
    revalidatePath('/about')
  } catch (e) {
    return resMessageError('DB_ERROR')
  }
  return resMessageSuccess('COMMENT_SUCCEED')
}

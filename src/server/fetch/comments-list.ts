import { resMessageError, resMessageSuccess } from '~/server/message'
import { dbReadAllCommentsDecBySlug } from '~/server/db/comments-list'

export async function fetchComments(slug: string) {
  try {
    const comments = await dbReadAllCommentsDecBySlug(slug)
    return resMessageSuccess('DB_READ_SUCCEED', comments)
  } catch (e) {
    console.error(e)
    return resMessageError('DB_COMMENTS_LOAD_ERROR')
  }
}

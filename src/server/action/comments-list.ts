'use server'
import z from 'zod'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { dbReadLoggedInUserInfoBySession } from '~/server/db/user'
import { dbCreateNewComment } from '~/server/db/comments-list'

export interface CommentFormState {
  status: 'idle' | 'error' | 'success'
  message: string
  fieldError?: string
  content: string
  revision: number
}

const commentSchema = z.object({
  content: z
    .string({ error: '评论内容格式不正确' })
    .trim()
    .min(1, '还没有写评论呢')
    .max(1000, '评论最多 1000 个字符'),
})

const errorState = (
  previousState: CommentFormState,
  message: string,
  content: string,
  fieldError?: string,
): CommentFormState => ({
  status: 'error',
  message,
  fieldError,
  content,
  revision: previousState.revision + 1,
})

export async function createCommentAction(
  slug: string,
  previousState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const submittedContent = formData.get('content')
  const content = typeof submittedContent === 'string' ? submittedContent : ''
  const parsed = commentSchema.safeParse({ content: submittedContent })
  if (!parsed.success) {
    return errorState(previousState, '评论还没有发送', content, parsed.error.issues[0]?.message)
  }

  const sessionId = (await cookies()).get('session-id')?.value
  if (!sessionId) return errorState(previousState, '登录状态已失效，请重新验证', content)

  let userInfo
  try {
    userInfo = await dbReadLoggedInUserInfoBySession(sessionId)
  } catch (error) {
    console.error('Failed to read the commenting user', error)
    return errorState(previousState, '暂时无法连接评论服务，请稍后重试', content)
  }
  if (!userInfo) return errorState(previousState, '登录状态已过期，请重新验证', content)

  try {
    await dbCreateNewComment(parsed.data.content, slug, userInfo.id)
    revalidatePath(slug === 'about' ? '/about' : `/posts/${encodeURIComponent(slug)}`)
  } catch (error) {
    console.error('Failed to create comment', error)
    return errorState(previousState, '评论发送失败，请稍后再试', content)
  }

  return {
    status: 'success',
    message: '评论已发布，感谢你的分享',
    content: '',
    revision: previousState.revision + 1,
  }
}

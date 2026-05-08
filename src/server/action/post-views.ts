'use server'

import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { POST_VIEW_COOKIE_MAX_AGE, POST_VIEW_VISITOR_COOKIE } from '~/lib/post-view-cookie'
import { incrementPostViewsForVisitor } from '~/server/fetch/post-views'

export interface IncrementPostViewState {
  views?: number
}

export async function incrementPostViewAction(
  _previousState: IncrementPostViewState,
  formData: FormData,
): Promise<IncrementPostViewState> {
  const slug = formData.get('slug')
  if (typeof slug !== 'string' || slug.length === 0) return {}

  const cookieStore = await cookies()
  const visitorId = cookieStore.get(POST_VIEW_VISITOR_COOKIE)?.value ?? randomUUID()

  const views = await incrementPostViewsForVisitor(slug, visitorId)

  if (!cookieStore.has(POST_VIEW_VISITOR_COOKIE)) {
    cookieStore.set(POST_VIEW_VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      maxAge: POST_VIEW_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  return { views }
}

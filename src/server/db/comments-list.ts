import { cache } from 'react'
import { getPrisma } from '~/server/db'

// READ
export const dbReadAllCommentsDecBySlug = cache(async (slug: string) => {
  return await getPrisma().comment.findMany({
    where: {
      postSlug: slug,
    },
    orderBy: {
      createAt: 'desc',
    },
    select: {
      id: true,
      content: true,
      createAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  })
})

// CREATE
export async function dbCreateNewComment(content: string, slug: string, authorId: string) {
  return await getPrisma().comment.create({
    data: {
      content,
      postSlug: slug,
      authorId,
    },
  })
}

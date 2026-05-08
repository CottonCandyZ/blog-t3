import { cacheLife, unstable_noStore as noStore } from 'next/cache'
import { cache } from 'react'
import {
  dbHasPostViewVisit,
  dbIncrementPostViews,
  dbIncrementPostViewsForVisitor,
  dbReadAllPostViews,
  dbReadPostViews,
} from '~/server/db/post-views'

export async function getPostViews(slug: string) {
  noStore()
  if (!process.env.POSTGRES_PRISMA_URL) return 0

  try {
    const postViews = await dbReadPostViews(slug)
    return postViews?.views ?? 0
  } catch (e) {
    console.error(e)
    return 0
  }
}

export const getAllPostViewsMap = cache(async () => {
  noStore()
  if (!process.env.POSTGRES_PRISMA_URL) return new Map<string, number>()

  try {
    const postViews = await dbReadAllPostViews()
    return new Map(postViews.map(({ slug, views }) => [slug, views]))
  } catch (e) {
    console.error(e)
    return new Map<string, number>()
  }
})

export async function getStaleAllPostViewsMap() {
  'use cache'
  cacheLife({
    stale: 300,
    revalidate: 30,
    expire: 3600,
  })

  if (!process.env.POSTGRES_PRISMA_URL) return new Map<string, number>()

  try {
    const postViews = await dbReadAllPostViews()
    return new Map(postViews.map(({ slug, views }) => [slug, views]))
  } catch (e) {
    console.error(e)
    return new Map<string, number>()
  }
}

export async function getStalePostViews(slug: string) {
  'use cache'
  cacheLife({
    stale: 300,
    revalidate: 30,
    expire: 3600,
  })

  if (!process.env.POSTGRES_PRISMA_URL) return 0

  try {
    const postViews = await dbReadPostViews(slug)
    return postViews?.views ?? 0
  } catch (e) {
    console.error(e)
    return 0
  }
}

export async function hasPostViewVisit(slug: string, visitorId: string) {
  noStore()
  if (!process.env.POSTGRES_PRISMA_URL) return false

  try {
    return await dbHasPostViewVisit(slug, visitorId)
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function incrementPostViews(slug: string) {
  noStore()
  if (!process.env.POSTGRES_PRISMA_URL) return 0

  try {
    const postViews = await dbIncrementPostViews(slug)
    return postViews.views
  } catch (e) {
    console.error(e)
    return await getPostViews(slug)
  }
}

export async function incrementPostViewsForVisitor(slug: string, visitorId: string) {
  noStore()
  if (!process.env.POSTGRES_PRISMA_URL) return 0

  try {
    const postViews = await dbIncrementPostViewsForVisitor(slug, visitorId)
    return postViews?.views ?? 0
  } catch (e) {
    console.error(e)
    return await getPostViews(slug)
  }
}

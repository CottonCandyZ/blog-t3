import prisma from '~/server/db'

export async function dbReadPostViews(slug: string) {
  return await prisma.postView.findUnique({
    where: { slug },
    select: { views: true },
  })
}

export async function dbReadAllPostViews() {
  return await prisma.postView.findMany({
    select: {
      slug: true,
      views: true,
    },
  })
}

export async function dbIncrementPostViews(slug: string) {
  return await prisma.postView.upsert({
    where: { slug },
    create: {
      slug,
      views: 1,
    },
    update: {
      views: {
        increment: 1,
      },
    },
    select: {
      views: true,
    },
  })
}

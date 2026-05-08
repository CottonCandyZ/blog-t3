import prisma from '~/server/db'

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2002'
  )
}

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

export async function dbHasPostViewVisit(slug: string, visitorId: string) {
  const visit = await prisma.postViewVisit.findUnique({
    where: {
      slug_visitorId: {
        slug,
        visitorId,
      },
    },
    select: {
      id: true,
    },
  })

  return Boolean(visit)
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

export async function dbIncrementPostViewsForVisitor(slug: string, visitorId: string) {
  try {
    return await prisma.$transaction(async (tx) => {
      await tx.postViewVisit.create({
        data: {
          slug,
          visitorId,
        },
      })

      return await tx.postView.upsert({
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
    })
  } catch (e) {
    if (isUniqueConstraintError(e)) return await dbReadPostViews(slug)
    throw e
  }
}

import { incrementPostViews } from '~/server/fetch/post-views'

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>
  },
) {
  const { slug } = await params
  const views = await incrementPostViews(decodeURIComponent(slug))
  return Response.json({ views })
}

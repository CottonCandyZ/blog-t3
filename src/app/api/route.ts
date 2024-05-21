import { getLatestPostsListInfo } from '~/server/fetch/posts'

export async function GET() {
  const posts = await getLatestPostsListInfo()
  return Response.json(posts)
}

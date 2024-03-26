import { getLatestPostsListInfo } from "~/lib/posts"

export async function GET() {
  const posts = await getLatestPostsListInfo();
  return Response.json(posts)
}
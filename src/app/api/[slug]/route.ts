import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>
  },
) {
  const { slug } = await params
  try {
    const posts = (await fs.readFile(path.join(process.cwd(), `posts/${slug}.mdx`))).toString()
    return new Response(posts)
  } catch {
    return Response.error()
  }
}

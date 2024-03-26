import fs from 'fs/promises'
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  try {
    const posts = (await fs.readFile(path.join(process.cwd(), `posts/${slug}.mdx`))).toString();
    return new Response(posts);
  } catch {
    return Response.error();
  }
}
import PostPage from "~/components/posts/post-page";
import { getPostContent } from "~/lib/posts";

export default async function Page({ params }: { params: { slug: string } }) {
  const postPageContent = await getPostContent(decodeURIComponent(params.slug));
  return <PostPage props={postPageContent} />;
}

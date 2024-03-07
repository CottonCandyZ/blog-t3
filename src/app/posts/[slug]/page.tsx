import PostContent from "~/components/posts/post-content";
import { getPostFrontmatter } from "~/lib/posts";
import type { Metadata } from "next";
import { Suspense } from "react";
import PostContentSkeleton from "~/components/posts/post-content-skeleton";
import SetTitle from "~/components/posts/set-title";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const frontmatter = await getPostFrontmatter(decodeURIComponent(params.slug));
  return {
    title: frontmatter.title,
  };
}
export default async function Page({ params }: { params: { slug: string } }) {
  const frontmatter = await getPostFrontmatter(decodeURIComponent(params.slug));
  return (
    <>
      <SetTitle title={frontmatter.title} />
      <Suspense fallback={<PostContentSkeleton />}>
        <PostContent slug={params.slug} />
      </Suspense>
    </>
  );
}

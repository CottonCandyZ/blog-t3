import PostContent from "~/components/posts/post-content";
import { getAllPostsSlug, getPostFrontmatter } from "~/lib/posts";
import type { Metadata } from "next";
import { Suspense } from "react";
import PostContentSkeleton from "~/components/posts/post-content-skeleton";

export async function generateStaticParams() {
  const postsSlug = await getAllPostsSlug();
  return postsSlug.map((postSlug) => ({
    slug: postSlug,
  }));
}

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
      <div className="relative col-span-full h-64 bg-primary-extralight">
        <div className="absolute -top-[4rem] h-16 w-full bg-primary-extralight"></div>
        <div className="sticky top-0 z-[4] h-20 bg-primary-extralight md:h-14"></div>
        <h1 className="relative z-[2] mx-auto mt-10 max-w-6xl px-5 text-4xl font-bold text-primary md:px-10">
          {frontmatter.title}
        </h1>
      </div>
      <div className="sticky top-0 z-[4] h-16 bg-white"></div>
      <main className="min-h-[calc(-300px+100dvh)] mx-auto max-w-6xl md:px-10 px-5 pb-20">
      <Suspense fallback={<PostContentSkeleton />}>
        <PostContent slug={params.slug} />
      </Suspense>
      </main>

    </>
  );
}

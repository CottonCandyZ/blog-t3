import PostContent from "~/components/posts/post-content";
import { getAllPostsSlug, getPostFrontmatter } from "~/server/fetch/posts";
import type { Metadata } from "next";
import { Suspense } from "react";
import PostContentSkeleton from "~/components/posts/post-content-skeleton";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import('~/components/comment'), {
  loading: () => <p className="text-primary font-bold text-lg">加载评论区中...</p>
})

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
      <main className="mx-auto min-h-[calc(-300px+100dvh)] max-w-6xl px-5 pb-20 md:px-10">
        <Suspense fallback={<PostContentSkeleton />}>
          <PostContent slug={params.slug} />
        </Suspense>
        <div className="mx-auto mt-10 w-full max-w-3xl lg:mx-0 flex justify-center items-center">
            <Comments slug={params.slug}/>
        </div>
      </main>
    </>
  );
}

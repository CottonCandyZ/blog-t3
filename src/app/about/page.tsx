import { Suspense } from "react";
import AboutContent from "~/components/about/about-content";
import AboutSkeleton from "~/components/about/about-skeleton";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import("~/components/comment"), {
  loading: () => (
    <p className="text-lg font-bold text-primary">加载评论区中...</p>
  ),
});

export default function page() {
  return (
    <div className="lg:justify-normal">
      <article className="markdown-body relative mx-auto w-full max-w-3xl lg:mx-0">
        {/* <Suspense fallback={<AboutSkeleton />}> */}
        <AboutContent />
        {/* </Suspense> */}
      </article>
      <div className="mx-auto mt-10 flex w-full max-w-3xl items-center justify-center lg:mx-0">
        <Comments slug="about" />
      </div>
    </div>
  );
}

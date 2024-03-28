import { Suspense } from "react";
import AboutContent from "~/components/about/about-content";
import AboutSkeleton from "~/components/about/about-skeleton";


export default function page() {
  return (
    <div className="lg:justify-normal">
      <article className="markdown-body relative mx-auto w-full max-w-2xl lg:mx-0">
        <Suspense fallback={<AboutSkeleton />}>
          <AboutContent />
        </Suspense>
      </article>
    </div>
  );
}

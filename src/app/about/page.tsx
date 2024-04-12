import AboutContent from "~/components/about/about-content";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import("~/components/comment"), {
  loading: () => (
    <div className="flex items-center justify-center">
      <p className="text-lg font-bold text-primary">加载评论区中...</p>
    </div>
  ),
});

export default function page() {
  return (
    <div className="lg:justify-normal">
      <article className="markdown-body relative mx-auto w-full max-w-3xl lg:mx-0">
        <AboutContent />
        <div className="mt-4">
          <Comments slug="about" />
        </div>
      </article>
    </div>
  );
}

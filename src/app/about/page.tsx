import AboutContent from "~/components/about/about-content";
import dynamic from "next/dynamic";

export const metadata = {
  title: "About",
};

const Comments = dynamic(() => import("~/components/comment"), {
  loading: () => (
    <div className="flex items-center justify-center">
      <p className="text-lg font-bold text-primary">加载评论区中...</p>
    </div>
  ),
});

export default function page() {
  return (
    <>
      <article className="markdown-body mt-4 rounded-2xl bg-white px-8 py-10 shadow-cxs">
        <AboutContent />
      </article>
      <div className="mt-4 rounded-2xl bg-white px-8 py-5 shadow-cxs">
        <Comments slug="about" />
      </div>
    </>
  );
}

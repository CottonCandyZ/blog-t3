import PostContent from "~/components/posts/post-content";
import type { PostFrontmatter } from "~/components/posts";

type postPageProps = {
  code: string;
  frontmatter: PostFrontmatter;
};

export default function PostPage({ props }: { props: postPageProps }) {
  const { code, frontmatter } = props;
  return (
    <div className="flex w-full items-start gap-2">
      <div className="w-full rounded-2xl bg-white p-8 shadow-2xl xl:shrink-0 xl:basis-[48rem]">
        <h1 className="mb-5 text-4xl font-bold text-primary">
          {frontmatter.title}
        </h1>
        <article className="markdown-body w-full">
          <PostContent code={code} />
        </article>
      </div>
      <div className="sticky top-3 hidden grow animate-show flex-col rounded-2xl bg-white p-2 shadow-2xl xl:flex">
        hello
      </div>
    </div>
  );
}

import PostContent from "~/components/posts/mdx-component";
import type { PostFrontmatter } from "~/components/posts";

interface postPageProps {
  code: string;
  frontmatter: PostFrontmatter;
};

export default function PostPage({ props }: { props: postPageProps }) {
  const { code, frontmatter } = props;
  return (
    <div className="flex w-full items-start gap-4">
      <div className="w-full rounded-2xl bg-white p-8 shadow-2xl xl:shrink-0 xl:basis-[54rem]">
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

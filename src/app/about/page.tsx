import dayjs from "dayjs";
import MDXComponent from "~/components/posts/mdx-component";
import { getAboutContent } from "~/lib/about";

export default async function page() {
  const { code: aboutCode, frontmatter } = await getAboutContent();
  return (
    <div className="lg:justify-normal">
      <article className="markdown-body relative mx-auto w-full max-w-2xl lg:mx-0">
        <MDXComponent code={aboutCode} />
        <div className="ml-auto w-max text-primary-dark">
          <time dateTime={frontmatter.date}>
            {dayjs(frontmatter.date).format("YYYY.M.D")}
          </time>
        </div>
      </article>
    </div>
  );
}

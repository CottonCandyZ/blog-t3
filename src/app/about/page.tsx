import dayjs from "dayjs";
import MDXComponent from "~/components/posts/mdx-component";
import { getAboutContent } from "~/lib/about";

export default async function page() {
  const { code: aboutCode, frontmatter } = await getAboutContent();
  return (
    <div className="lg:justify-normal">
      <article className="markdown-body relative w-full max-w-2xl mx-auto lg:mx-0">
        <MDXComponent code={aboutCode} />
        <div className="ml-auto w-max text-primary-dark">
        {dayjs(frontmatter.date).format("YYYY.M.D")}
      </div>
      </article>
    </div>
  );
}

import dayjs from "dayjs";
import MDXComponent from "~/components/posts/mdx-component";
import { getAboutContent } from "~/lib/about";

export default async function page() {
  const { code: aboutCode, frontmatter } = await getAboutContent();
  return (
    <div className="mx-auto max-w-6xl justify-center gap-10 px-5 py-10 md:px-10 lg:justify-normal">
      <article className="markdown-body relative w-full max-w-2xl">
        <MDXComponent code={aboutCode} />
        <div className="ml-auto w-max text-primary-dark">
        {dayjs(frontmatter.date).format("YYYY.M.D")}
      </div>
      </article>
      
    </div>
  );
}

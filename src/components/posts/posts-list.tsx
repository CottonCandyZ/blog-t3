import dayjs from "dayjs";
import Link from "next/link";
import { ArrowRight } from "~/components/icons";
import type { PostFrontmatter } from "~/components/posts";

export type PostListProps = {
  slug: string;
  frontmatter: PostFrontmatter;
}[];

export default function PostsList({ props }: { props: PostListProps }) {
  return props.map(({ slug, frontmatter }, id) => (
    <article key={id}>
      <Link href={`/posts/${slug}`} className="group">
        <div className="flex flex-row items-start justify-between gap-4">
          <h1 className="text-xl font-semibold group-hover:text-primary">
            {frontmatter.title}
          </h1>
          <h2 className="min-w-max mt-[2px] font-medium">
            {dayjs(frontmatter.date).format("MMMM D")}
          </h2>
        </div>
        <p className="mt-5">{frontmatter.abstract}</p>
        <div className="mt-3 flex flex-row items-center gap-1">
          <h2 className="text-lg font-medium">Read More</h2>
          <ArrowRight
            className="mt-[2px] text-2xl transition-transform 
      duration-200 ease-in-out group-hover:translate-x-1 group-hover:text-primary"
          />
        </div>
      </Link>
    </article>
  ));
}

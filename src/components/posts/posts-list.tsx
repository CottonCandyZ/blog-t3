'use client'
import dayjs from "dayjs";
import Link from "next/link";
import { useContext } from "react";
import { ArrowRight } from "~/components/icons";
import type { PostFrontmatter } from "~/components/posts";
import { TagsContext } from "~/components/posts/tag-provider";

export interface PostListProps {
  posts: { slug: string; frontmatter: PostFrontmatter }[];
}

const PostsList: React.FC<PostListProps> = ({ posts }) => {
  const { toggledTags } = useContext(TagsContext);
  if (toggledTags.size != 0) {
    posts = posts.filter(({frontmatter}) => {
      if (!frontmatter.tags) return false;
      let include = true;
      toggledTags.forEach((tagName) => {
        if (!frontmatter.tags?.includes(tagName)) {
          include = false;
        }
      });
      return include;
    });
  }

  return posts.map(({ slug, frontmatter }, id) => (
    <article key={id}>
      <Link href={`/posts/${slug}`} className="group">
        <div className="flex flex-row items-start justify-between gap-4">
          <h1 className="text-xl font-semibold group-hover:text-primary">
            {frontmatter.title}
          </h1>
          <h2 className="mt-[2px] min-w-max font-medium">
            <time dateTime={frontmatter.date}>{dayjs(frontmatter.date).format("YYYY.M.D")}</time>
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
};

export default PostsList;

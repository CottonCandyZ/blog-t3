"use client";
import Link from "next/link";
import { useContext } from "react";
import { TagsContext } from "~/components/client-wrapper";
import { ArrowRight } from "~/components/icons";
import type { PostFrontmatter } from "~/components/posts";
import PostInfo from "~/components/posts/post-info";

export interface PostListProps {
  posts: { slug: string; frontmatter: PostFrontmatter }[];
}

const PostsList: React.FC<PostListProps> = ({ posts }) => {
  const { toggledTags } = useContext(TagsContext);
  if (toggledTags.size != 0) {
    posts = posts.filter(({ frontmatter }) => {
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

  return (
    <div className="flex flex-col gap-4">
      {posts.map(({ slug, frontmatter }) => (
        <article
          key={slug}
          className="group cursor-pointer rounded-2xl bg-primary-bg px-8 py-5 shadow-cxs"
        >
          <Link href={`/posts/${slug}`}>
            <h1
              className="relative text-2xl font-bold
              before:absolute before:-left-3 before:bottom-2 before:top-2 
              before:w-1 before:rounded-md before:bg-primary-medium
              group-hover:text-primary"
            >
              {frontmatter.title}
            </h1>
            <div className="mt-4">
              <PostInfo date={frontmatter.date} tags={frontmatter.tags} />
            </div>
            <p className="mt-5 text-base leading-relaxed">
              {frontmatter.abstract}
            </p>
            <div className="mt-3 flex flex-row items-center gap-1">
              <h2 className="text-base font-medium">Read More</h2>
              <ArrowRight
                className="mt-[2px] text-2xl transition-transform 
      duration-200 ease-in-out group-hover:translate-x-1 group-hover:text-primary"
              />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default PostsList;

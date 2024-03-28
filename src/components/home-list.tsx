"use client";
import { useState } from "react";
import PostsList, { type PostListProps } from "~/components/posts/posts-list";
import Tags from "~/components/posts/tags";

interface homeListProps {
  latestPostsListInfo: PostListProps["posts"];
  uniqueTags: Set<string>;
  oTags: string[][];
}

const HomeList: React.FC<homeListProps> = ({
  latestPostsListInfo,
  uniqueTags,
  oTags,
}) => {
  const [toggledTags, setToggledTags] = useState(new Set<string>());
  let currentTags = new Set<string>(uniqueTags);
  const otherTagsSet = new Set<string>();
  oTags.forEach((tags) => {
    // 是否存在这样的文章包含已经选中的 tags
    let include = true;
    toggledTags.forEach((toggledTagName) => {
      if (!tags.includes(toggledTagName)) {
        include = false;
      }
    });
    if (include) {
      tags.forEach((tag) => otherTagsSet.add(tag));
    }
  });
  uniqueTags.forEach((tagName) => {
    if (!otherTagsSet.has(tagName)) {
      currentTags.delete(tagName);
    }
  });
  currentTags = new Set([...currentTags].sort((a, b) => a.localeCompare(b)));

  // 这个地方写的有点恶心
  // TODO: Need to rewrite. Including simplified code and useReducer.
  const toggle = (tagName: string) => {
    return () => {
      // 确定是移除还是新增
      const remove = toggledTags.has(tagName);
      if (remove) {
        toggledTags.delete(tagName);
        // 要保留的 tags
        const remain = new Set<string>();
        toggledTags.forEach((toggledTag) => {
          const otherTagsArray: string[][] = [];
          oTags.forEach((tags) => {
            let include = true;
            if (!tags.includes(toggledTag)) {
              include = false;
            }
            if (include) {
              otherTagsArray.push(tags);
            }
          });
          // 找到最小化的单位
          const filtered = otherTagsArray[0]?.filter((item) => {
            for (let i = 1; i < otherTagsArray.length; i++) {
              if (!otherTagsArray[i]?.includes(item)) return false;
            }
            return true;
          });
          // 如果里面不包含要去除的 tag，那就保留
          if (!filtered?.includes(tagName)) {
            filtered?.forEach((tag) => remain.add(tag));
          }
        });
        toggledTags.forEach((tag) => {
          if (!remain.has(tag)) toggledTags.delete(tag);
        });
      } else {
        const otherTagsArray: string[][] = [];
        toggledTags.add(tagName);
        oTags.forEach((tags) => {
          // 是否存在这样的文章包含已经选中的 tags
          let include = true;
          toggledTags.forEach((toggledTagName) => {
            if (!tags.includes(toggledTagName)) {
              include = false;
            }
          });
          if (include) {
            otherTagsArray.push(tags);
          }
        });
        // 寻找最小集
        otherTagsArray[0]
          ?.filter((item) => {
            for (let i = 1; i < otherTagsArray.length; i++) {
              if (!otherTagsArray[i]?.includes(item)) return false;
            }
            return true;
          })
          ?.forEach((otherTagName) => {
            toggledTags.add(otherTagName);
          });
      }
      setToggledTags(new Set(toggledTags));
    };
  };
  const clearTag = () => {
    setToggledTags(new Set());
  };

  return (
    <>
      <section className="col-span-full row-start-1 h-min md:sticky md:top-24 md:col-start-2 md:block">
        <search>
          <h2 className="text-xl font-medium tracking-widest text-primary">
            Tags (Click to filter)
          </h2>
          <div className="mt-3 h-min">
            <Tags
              currentTags={currentTags}
              toggledTags={toggledTags}
              toggle={toggle}
              clear={clearTag}
            />
          </div>
        </search>
      </section>
      <section className="col-span-full row-start-2 md:col-start-1 md:col-end-1 md:row-start-1">
        <h2 className="text-xl font-medium tracking-widest text-primary">
          最新序
        </h2>
        <div className="h-10"></div>
        <div className="flex flex-col gap-8">
          <PostsList posts={latestPostsListInfo} toggledTags={toggledTags} />
        </div>
      </section>
    </>
  );
};

export default HomeList;

"use client";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    const saveTags = sessionStorage.getItem("tags");
    if (saveTags) {
      setToggledTags(new Set(JSON.parse(saveTags) as Array<string>));
    }
  }, []);
  const [toggledTags, setToggledTags] = useState(new Set<string>());
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
  const currentTags = new Set([...otherTagsSet].concat([...toggledTags]));
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
          // 找到交集
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
        // 寻找交集
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
      sessionStorage.setItem("tags", JSON.stringify([...toggledTags]));
    };
  };
  const clearTag = () => {
    setToggledTags(new Set());
    sessionStorage.setItem("tags", JSON.stringify([]));
  };

  return (
    <>
      <section
        className="md:top- col-span-full
      row-start-1 mt-4 h-min rounded-2xl bg-white p-4 shadow-cxs md:sticky md:col-start-2 md:block"
      >
        <search>
          <h2
            className="relative pl-3 text-xl font-medium text-primary
            before:absolute before:left-0 before:top-1.5 before:h-4 before:w-1 before:rounded-md
            before:bg-primary-light"
          >
            Tags
          </h2>
          <div className="mt-1 h-min">
            <Tags
              allTags={uniqueTags}
              currentTags={currentTags}
              toggledTags={toggledTags}
              toggle={toggle}
              clear={clearTag}
            />
          </div>
        </search>
      </section>
      <section className="col-span-full row-start-2 md:col-start-1 md:col-end-1 md:row-start-1 md:mt-4">
        <PostsList posts={latestPostsListInfo} toggledTags={toggledTags} />
      </section>
    </>
  );
};

export default HomeList;

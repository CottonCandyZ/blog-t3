"use client";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { TagsContext } from "~/components/client-wrapper";

export interface tagProps {
  uniqueTags: Set<string>;
  oTags: string[][];
}

const Tags: React.FC<tagProps> = ({ uniqueTags, oTags }) => {
  const { toggledTags, setToggledTags } = useContext(TagsContext);
  useEffect(() => {
    const saveTags = sessionStorage.getItem("tags");
    if (saveTags) {
      setToggledTags(new Set(JSON.parse(saveTags) as Array<string>));
    }
  }, []);

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
  const noToggled = toggledTags.size == 0;
  return (
    <div className="flex flex-col justify-start gap-2">
      <div className="flex flex-row flex-wrap gap-2">
        {Array.from(uniqueTags).map((tagName) => {
          const isToggled = toggledTags.has(tagName);
          return (
            <button
              className={clsx(
                `flex flex-row items-center rounded-xl px-2 py-0.5 font-medium transition-all `,
                {
                  "bg-primary-light/60 text-primary md:hover:bg-primary-small md:hover:text-white md:hover:shadow-md":
                    !isToggled && currentTags.has(tagName),
                  "bg-primary-small text-white shadow-md": isToggled,
                  "cursor-not-allowed text-primary ": !currentTags.has(tagName),
                },
              )}
              disabled={!currentTags.has(tagName)}
              onClick={toggle(tagName)}
              key={tagName}
            >
              {tagName}
            </button>
          );
        })}
      </div>
      <button
        className={clsx(
          `mr-auto rounded-xl bg-primary-light/60 px-2 py-0.5 font-semibold text-primary 
          md:hover:bg-primary-small md:hover:text-white md:hover:shadow-md`,
          {
            hidden: noToggled,
          },
        )}
        onClick={clearTag}
      >
        Clear
      </button>
    </div>
  );
};

export default Tags;

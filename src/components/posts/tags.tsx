"use client";
import clsx from "clsx";
import { useContext, useRef } from "react";
import { CloseIcon } from "~/components/icons";
import { TagsContext } from "~/components/posts/tag-provider";

interface tagProps {
  uniqueTags: Set<string>;
  oTags: string[][];
}

const Tags: React.FC<tagProps> = ({ uniqueTags, oTags }) => {
  const { toggledTags, setToggledTags } = useContext(TagsContext);
  const currentTags = useRef(
    new Set<string>([...uniqueTags].sort((a, b) => a.localeCompare(b))),
  );

  // 这个地方写的有点恶心
  const toggle = (tagName: string) => {
    return () => {
      const otherTagsSet = new Set<string>();
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
        if (otherTagsSet.has(tagName)) {
          if (!currentTags.current.has(tagName))
            currentTags.current.add(tagName);
        } else {
          if (currentTags.current.has(tagName))
            currentTags.current.delete(tagName);
        }
      });
      currentTags.current = new Set(
        [...currentTags.current].sort((a, b) => a.localeCompare(b)),
      );
      setToggledTags(new Set(toggledTags));
    };
  };
  const noToggled = toggledTags.size == 0;
  return (
    <div className="flex flex-col gap-2">
      <button
        className={clsx("ml-auto font-semibold text-primary", {
          invisible: noToggled,
        })}
        onClick={() => {
          setToggledTags(new Set());
          currentTags.current = new Set<string>(
            [...uniqueTags].sort((a, b) => a.localeCompare(b)),
          );
        }}
      >
        Clear
      </button>
      <div className="flex flex-row flex-wrap gap-2">
        {Array.from(currentTags.current).map((tagName, index) => {
          const isToggled = toggledTags.has(tagName);
          return (
            <button
              className={clsx(
                `flex flex-row items-center rounded-xl px-2 py-0.5 font-medium transition-all hover:bg-primary-medium hover:text-white`,
                {
                  "bg-primary-extralight text-primary": !isToggled,
                  "bg-primary-medium text-white": isToggled,
                },
              )}
              onClick={toggle(tagName)}
              key={index}
            >
              {tagName}
              <CloseIcon
                className={clsx(``, {
                  "wl-1 w-auto translate-x-1 opacity-100": isToggled,
                  "w-0 opacity-0": !isToggled,
                })}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;

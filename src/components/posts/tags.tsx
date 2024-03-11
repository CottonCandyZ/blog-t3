"use client";
import clsx from "clsx";
import { useContext } from "react";
import { CloseIcon } from "~/components/icons";
import { TagsContext } from "~/components/posts/tag-provider";

interface tagProps {
  uniqueTags: Set<string>;
  oTags: string[][];
}

const Tags: React.FC<tagProps> = ({ uniqueTags, oTags }) => {
  const { toggleState, setToggleState } = useContext(TagsContext);
  const toggledTags = new Set<string>();
  const toggle = (tagName: string) => {
    return () => {
      toggleState.set(tagName, !toggleState.get(tagName));

      const otherTags = new Set<string>();
      toggleState.forEach((isToggled, tagName) => {
        if (isToggled) toggledTags.add(tagName);
      });
      oTags.forEach((tags) => {
        // 是否存在这样的文章包含已经选中的 tags
        let include = true;
        toggledTags.forEach((tagName) => {
          if (!tags.includes(tagName)) {
            include = false;
          }
        });
        if (include) {
          tags.forEach((tag) => otherTags.add(tag));
        }
      });
      uniqueTags.forEach((tagName) => {
        if (toggledTags.has(tagName) || otherTags.has(tagName)) {
          if (!toggleState.has(tagName)) toggleState.set(tagName, false);
        } else {
          if (toggleState.has(tagName)) toggleState.delete(tagName);
        }
      });
      setToggleState(
        new Map(
          [...toggleState.entries()].sort((a, b) =>
            String(a[0]).localeCompare(b[0]),
          ),
        ),
      );
    };
  };

  return (
    <div className="flex flex-col gap-2">
      <button className={clsx("ml-auto mr-16 text-primary font-semibold invisible", {
      })}>clear</button>
      <div className="flex flex-row flex-wrap gap-2">
        {Array.from(toggleState).map(([tagName, isToggled], index) => {
          return (
            <button
              className={clsx(
                `flex flex-row items-center gap-1 rounded-xl px-2 py-0.5 font-medium transition-all hover:bg-primary-medium hover:text-white`,
                {
                  "bg-primary-extralight text-primary": !isToggled,
                  "bg-primary-medium text-white": isToggled,
                },
              )}
              onClick={toggle(tagName)}
              key={index}
            >
              {tagName}{" "}
              <CloseIcon
                className={clsx(`transition-opacity`, {
                  "w-auto opacity-100": isToggled,
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

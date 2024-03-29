"use client";
import clsx from "clsx";

interface tagProps {
  allTags: Set<string>;
  toggledTags: Set<string>;
  currentTags: Set<string>;
  toggle: (tagName: string) => () => void;
  clear: () => void;
}

const Tags: React.FC<tagProps> = ({ allTags, toggledTags, currentTags, clear, toggle }) => {
  const noToggled = toggledTags.size == 0;
  return (
    <div className="flex flex-col gap-2">
      <button
        className={clsx("ml-auto font-semibold text-primary", {
          invisible: noToggled,
        })}
        onClick={clear}
      >
        Clear
      </button>
      <div className="flex flex-row flex-wrap gap-2">
        {Array.from(allTags).map((tagName) => {
          const isToggled = toggledTags.has(tagName);
          return (
            <button
              className={clsx(
                `flex flex-row items-center rounded-xl px-2 py-0.5 font-medium transition-all `,
                {
                  "bg-primary-extralight text-primary hover:bg-primary-medium hover:text-white hover:shadow-md": !isToggled && currentTags.has(tagName),
                  "bg-primary-medium text-white shadow-md": isToggled,
                  "text-primary cursor-not-allowed ": !currentTags.has(tagName)
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
    </div>
  );
};

export default Tags;

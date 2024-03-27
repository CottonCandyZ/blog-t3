"use client";
import clsx from "clsx";
import { CloseIcon } from "~/components/icons";

interface tagProps {
  toggledTags: Set<string>;
  currentTags: Set<string>;
  toggle: (tagName: string) => () => void;
  clear: () => void;
}

const Tags: React.FC<tagProps> = ({ toggledTags, currentTags, clear, toggle }) => {
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
        {Array.from(currentTags).map((tagName) => {
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
              key={tagName}
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

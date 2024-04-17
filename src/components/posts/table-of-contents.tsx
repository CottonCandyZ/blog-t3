"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface heading {
  id: string;
  text: string;
  level: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface headings extends Array<heading> {}

const useHeadings = () => {
  const [headings, setHeadings] = useState<headings>([]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(
        ".markdown-body > h2, .markdown-body > h3, .markdown-body > h4, .markdown-body > h5, .markdown-body > h6",
      ),
    )
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? "",
        level: Number(element.tagName.substring(1)),
      }));
    setHeadings(elements);
  }, []);
  return headings;
};

function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string>();
  useEffect(() => {
    const element = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const handleScroll = () => {
      element.forEach((item, index) => {
        if (index == 0 && item!.getBoundingClientRect().top > 98) {
          setActiveId("");
        }
        if (item!.getBoundingClientRect().top < 98) {
          setActiveId(item!.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids]);
  return activeId;
}

const TableOfContents: React.FC = () => {
  const headings = useHeadings();
  const activeId = useScrollSpy(headings.map(({ id }) => id));
  return (
    <ul className="flex list-none flex-col gap-2">
      {headings.map((heading, index) => {
        return (
          <li key={index} className="active:scale-95">
            <a
              href={`#${heading.id}`}
              className={clsx(`hover:font-semibold hover:text-primary-dark`, {
                "ml-4 text-sm": heading.level > 2,
                "text-base font-medium": heading.level === 2,
                "font-semibold text-primary-dark": activeId === heading.id,
                "text-primary-medium": activeId !== heading.id,
              })}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TableOfContents;

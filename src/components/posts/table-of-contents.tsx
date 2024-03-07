"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

type headings = {
  id: string;
  text: string;
  level: number;
}[];

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
    window.addEventListener("scroll", () => {
      element.forEach((item, index) => {
        if (index == 0 && item!.getBoundingClientRect().top > 85) {
          setActiveId('');
        }
        if (item!.getBoundingClientRect().top < 85) {
          setActiveId(item!.id);
        }
      });
    });
  }, [ids]);
  return activeId;
}

const TableOfContents: React.FC = () => {
  const headings = useHeadings();
  const activeId = useScrollSpy(headings.map(({ id }) => id));
  return (
    <ul className="flex list-none flex-col gap-0.5">
      {headings.map((heading, index) => {
        return (
          <li key={index}>
            <a
              href={`#${heading.id}`}
              className={clsx(`hover:text-primary-dark hover:font-semibold`, {
                "ml-4 text-sm": heading.level > 2,
                "text-base font-medium": heading.level === 2,
                "text-primary-dark font-semibold": activeId === heading.id,
                "text-primary-light": activeId !== heading.id,
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

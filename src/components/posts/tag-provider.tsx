"use client";

import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useState,
} from "react";

interface TagsContext {
  toggleState: Map<string, boolean>;
  setToggleState: Dispatch<SetStateAction<Map<string, boolean>>>;
}
interface TagsProviderProps {
  uniqueTags: Set<string>;
}

export const TagsContext = createContext({} as TagsContext);

const TagsProvider: React.FC<PropsWithChildren<TagsProviderProps>> = ({
  children,
  uniqueTags,
}) => {
  const toggleTagsMap = new Map<string, boolean>();
  uniqueTags.forEach((tagName) => {
    toggleTagsMap.set(tagName, false);
  });
  const [toggleState, setToggleState] = useState(
    new Map(
      [...toggleTagsMap.entries()].sort((a, b) =>
        String(a[0]).localeCompare(b[0]),
      ),
    ),
  );

  return (
    <TagsContext.Provider value={{ toggleState, setToggleState }}>
      {children}
    </TagsContext.Provider>
  );
};


export default TagsProvider;
"use client";

import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useState,
} from "react";

interface TagsContext {
  toggledTags: Set<string>;
  setToggledTags: Dispatch<SetStateAction<Set<string>>>;
}

export const TagsContext = createContext({} as TagsContext);

const TagsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [toggledTags, setToggledTags] = useState(new Set<string>());

  return (
    <TagsContext.Provider value={{ toggledTags, setToggledTags }}>
      {children}
    </TagsContext.Provider>
  );
};

export default TagsProvider;

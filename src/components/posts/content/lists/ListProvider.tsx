'use client'
import { type PropsWithChildren, createContext } from "react";

interface ListProviderProps {
  type: "ul" | "ol" | "tl";
}

interface ListContext {
  type: ListProviderProps["type"];
}

export const ListContext = createContext({} as ListContext);

const ListProvider: React.FC<PropsWithChildren<ListProviderProps>> = (
  props,
) => {
  const { children, type } = props;
  return (
    <ListContext.Provider value={{ type }}>{children}</ListContext.Provider>
  );
};

export default ListProvider;

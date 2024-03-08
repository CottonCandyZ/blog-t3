"use client";

import { useContext, useEffect } from "react";
import { RootContext } from "~/components/root-provider";

const SetTitle = ({ title }: { title: string }) => {
  const {
    postTitle: { setter: setTitle },
  } = useContext(RootContext);
  // https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
  return <></>;
};
export default SetTitle;

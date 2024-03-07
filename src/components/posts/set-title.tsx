"use client";

import { useContext } from "react";
import { RootContext } from "~/components/root-provider";

const SetTitle = ({ title }: { title: string }) => {
  const {
    postTitle: { setter: setTitle },
  } = useContext(RootContext);
  setTitle(title);
  return <></>;
};
export default SetTitle;

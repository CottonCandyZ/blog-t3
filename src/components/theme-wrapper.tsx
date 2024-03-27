"use client";
import { type PropsWithChildren } from "react";
const ThemeWrapper: React.FC<PropsWithChildren> = (props) => {
  const themeNumber = Math.floor(Math.random() * 8) + 1;
  return <body className={`theme-${themeNumber}`}>{props.children}</body>;
};

export default ThemeWrapper;

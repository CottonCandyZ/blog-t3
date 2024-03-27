'use client'
import { useRef, type PropsWithChildren } from "react";
const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const themeNumber = useRef(Math.floor(Math.random() * 8) + 1);
  return <body className={`theme-${themeNumber.current}`}>{children}</body>;
};

export default ThemeWrapper;

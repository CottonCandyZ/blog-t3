"use client";
import {
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  createContext,
  useEffect,
} from "react";
interface themeContext {
  themeNumber: number;
  setThemeNumber: Dispatch<SetStateAction<number>>;
}
export const ThemeContext = createContext({} as themeContext);
const ThemeWrapper: React.FC<PropsWithChildren<{themeCookie?: string}>> = ({ children, themeCookie }) => {
  const def = themeCookie ? Number(themeCookie) : 1;
  const [themeNumber, setThemeNumber] = useState(def);
  useEffect(() => {
    document.cookie = `theme=${themeNumber}`
  },[themeNumber])
  return (
    <ThemeContext.Provider value={{ themeNumber, setThemeNumber }}>
        <body className={`theme-${themeNumber}`}>{children}</body>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;

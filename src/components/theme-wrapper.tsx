"use client";
import clsx from "clsx";
import {
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  createContext,
} from "react";
interface themeContext {
  themeNumber: number;
  setThemeNumber: Dispatch<SetStateAction<number>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}
export const ThemeContext = createContext({} as themeContext);
const ThemeWrapper: React.FC<
  PropsWithChildren<{ theme: string | undefined }>
> = ({ children, theme }) => {
  const initThemeNumber = theme ? Number(theme) : 1;
  const [themeNumber, setThemeNumber] = useState(initThemeNumber);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider
      value={{ themeNumber, setThemeNumber, darkMode, setDarkMode }}
    >
      <body
        className={clsx(
          `theme-${themeNumber} bg-primary-extralight dark:bg-black dark:text-white`,
          {
            dark: darkMode,
          },
        )}
      >
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;

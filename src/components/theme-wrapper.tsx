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
const ThemeWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [themeNumber, setThemeNumber] = useState(1);
  useEffect(() => {
    setThemeNumber(localStorage.theme
    ? localStorage.theme as number
    : 1);
  }, [])
  return (
    <ThemeContext.Provider value={{ themeNumber, setThemeNumber }}>
      <body className={`theme-${themeNumber}`}>{children}</body>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;

"use client";
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
}
export const ThemeContext = createContext({} as themeContext);
const ThemeWrapper: React.FC<PropsWithChildren<{ theme: string | undefined}>> = ({
  children,
  theme,
}) => {
  const initThemeNumber = theme ? Number(theme) : 1;
  const [themeNumber, setThemeNumber] = useState(initThemeNumber);
  return (
    <ThemeContext.Provider value={{ themeNumber, setThemeNumber }}>
      <body className={`theme-${themeNumber}`}>{children}</body>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;

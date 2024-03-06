"use client";
import clsx from "clsx";
import {
  useState,
  type PropsWithChildren,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Noto_Sans } from "next/font/google";
const noto_sans = Noto_Sans({
  subsets: ["latin"],
});
interface RootContext {
  themeNumber: number;
  setThemeNumber: Dispatch<SetStateAction<number>>;
  MobileNavExpend: boolean;
  setMobileNavExpend: Dispatch<SetStateAction<boolean>>;
}

export const RootContext = createContext({} as RootContext);

const RootProvider: React.FC<PropsWithChildren> = (props) => {
  const [themeNumber, setThemeNumber] = useState(
    Math.floor(Math.random() * 8) + 1,
  );
  const [MobileNavExpend, setMobileNavExpend] = useState(false);
  const value = {
    themeNumber,
    setThemeNumber,
    MobileNavExpend,
    setMobileNavExpend,
  };

  return (
    <RootContext.Provider value={value}>
      <body
        className={clsx(
          `antialiased ${noto_sans.className} theme-${themeNumber} min-h-screen`,
          {
            "overflow-hidden": MobileNavExpend,
          },
        )}
      >
        {props.children}
      </body>
    </RootContext.Provider>
  );
};

export default RootProvider;

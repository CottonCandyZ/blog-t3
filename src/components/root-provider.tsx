"use client";
import clsx from "clsx";
import {
  useState,
  type PropsWithChildren,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";
interface RootContext {
  themeNumber: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
  mobileNavExpend: {
    value: boolean;
    setter: Dispatch<SetStateAction<boolean>>;
  };
  postTitle: {
    value: string;
    setter: Dispatch<SetStateAction<string>>;
  };
}

export const RootContext = createContext({} as RootContext);

const RootProvider: React.FC<PropsWithChildren> = (props) => {
  const [themeNumber, setThemeNumber] = useState(
    Math.floor(Math.random() * 8) + 1,
  );
  const [mobileNavExpend, setMobileNavExpend] = useState(false);
  const [postTitle, setPostTitle] = useState("");

  return (
    <RootContext.Provider
      value={{
        themeNumber: {
          value: themeNumber,
          setter: setThemeNumber,
        },
        mobileNavExpend: {
          value: mobileNavExpend,
          setter: setMobileNavExpend,
        },
        postTitle: {
          value: postTitle,
          setter: setPostTitle,
        },
      }}
    >
      <body
        className={clsx(`min-h-screen antialiased`, {
          "overflow-hidden": mobileNavExpend,
        })}
      >
        <div className={`theme-${themeNumber}`}>{props.children}</div>
      </body>
    </RootContext.Provider>
  );
};

export default RootProvider;

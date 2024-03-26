"use client";
import clsx from "clsx";
import {
  useState,
  type PropsWithChildren,
  createContext,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";
interface RootContext {
  mobileNavExpend: {
    value: boolean;
    setter: Dispatch<SetStateAction<boolean>>;
  };
  postTitle: {
    value: string;
    setter: Dispatch<SetStateAction<string>>;
  };
  toggledTags: {
    value: Set<string>;
    setter: Dispatch<SetStateAction<Set<string>>>;
  };
}

export const RootContext = createContext({} as RootContext);
const RootProvider: React.FC<PropsWithChildren> = (props) => {
  const [mobileNavExpend, setMobileNavExpend] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [toggledTags, setToggledTags] = useState(new Set<string>());
  const themeNumber = useRef(Math.floor(Math.random() * 8) + 1);

  return (
    <RootContext.Provider
      value={{
        mobileNavExpend: {
          value: mobileNavExpend,
          setter: setMobileNavExpend,
        },
        postTitle: {
          value: postTitle,
          setter: setPostTitle,
        },
        toggledTags: {
          value: toggledTags,
          setter: setToggledTags,
        }
      }}
    >
      <body
        className={clsx(`min-h-screen antialiased`, {
          "overflow-hidden": mobileNavExpend,
        })}
      >
        <div className={`theme-${themeNumber.current}`}>{props.children}</div>
      </body>
    </RootContext.Provider>
  );
};

export default RootProvider;

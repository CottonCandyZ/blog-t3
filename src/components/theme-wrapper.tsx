import { type PropsWithChildren } from "react";
export const dynamic = 'force-dynamic';
const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const themNumber = Math.floor(Math.random() * 8) + 1;
  return <body className={`theme-${themNumber}`}>{children}</body>;
};

export default ThemeWrapper;
